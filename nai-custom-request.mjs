function invalidRequest(message, code = 'bad_request') {
    const error = new Error(message);
    error.code = code;
    return error;
}

export function getNaiEndpoints(value) {
    const rawEndpoint = String(value ?? '').trim();
    const endpoint = rawEndpoint.includes('?') ? rawEndpoint : rawEndpoint.replace(/\/+$/, '');
    if (!endpoint) return { generate: '', encodeVibe: '', alternateGenerate: '' };
    try {
        const parsed = new URL(endpoint);
        const path = parsed.pathname.replace(/\/+$/, '');
        const withPath = pathname => {
            const url = new URL(parsed);
            url.pathname = pathname || '/';
            return url.href;
        };
        if (!path) return {
            generate: withPath('/ai/generate-image'), encodeVibe: withPath('/ai/encode-vibe'), alternateGenerate: endpoint,
        };
        if (path.endsWith('/ai/generate-image')) return {
            generate: endpoint, encodeVibe: withPath(path.replace(/\/ai\/generate-image$/, '/ai/encode-vibe')),
            alternateGenerate: withPath(path.replace(/\/ai\/generate-image$/, '')),
        };
        return { generate: endpoint, encodeVibe: withPath(`${path}/ai/encode-vibe`), alternateGenerate: withPath(`${path}/ai/generate-image`) };
    } catch {
        return { generate: endpoint, encodeVibe: `${endpoint}/ai/encode-vibe`, alternateGenerate: `${endpoint}/ai/generate-image` };
    }
}

const encodings = new Map();

// Share identical in-flight encodings. Cancelling one caller must not cancel
// another caller that is still waiting for the same reference image.
export function runNaiEncodingOnce(key, signal, encode) {
    const cancelled = () => Object.assign(new Error('已取消'), { name: 'AbortError', code: 'aborted' });
    if (signal?.aborted) return Promise.reject(cancelled());
    let entry = encodings.get(key);
    if (!entry) {
        entry = { controller: new AbortController(), consumers: new Set(), settled: false };
        encodings.set(key, entry);
        entry.promise = Promise.resolve().then(() => encode(entry.controller.signal)).finally(() => {
            entry.settled = true;
            if (encodings.get(key) === entry) encodings.delete(key);
        });
    }
    return new Promise((resolve, reject) => {
        const consumer = {};
        entry.consumers.add(consumer);
        const release = () => {
            signal?.removeEventListener('abort', abort);
            entry.consumers.delete(consumer);
            if (!entry.settled && !entry.consumers.size) {
                if (encodings.get(key) === entry) encodings.delete(key);
                entry.controller.abort();
            }
        };
        const abort = () => {
            if (!entry.consumers.has(consumer)) return;
            release();
            reject(cancelled());
        };
        signal?.addEventListener('abort', abort, { once: true });
        entry.promise.then(value => {
            if (!entry.consumers.has(consumer)) return;
            release();
            resolve(value);
        }, error => {
            if (!entry.consumers.has(consumer)) return;
            release();
            reject(error);
        });
    });
}

// Preserve the existing base-URL/full-endpoint input convention. Resolve the
// generation URL once, without trying alternate addresses after an API error.
export function getCustomNaiEndpoint(value) {
    const endpoint = String(value ?? '').trim();
    let parsed;
    try {
        parsed = new URL(endpoint);
    } catch {
        throw invalidRequest('请填写完整的 NAI 生图接口 URL', 'config');
    }
    if (!['http:', 'https:'].includes(parsed.protocol) || parsed.hash) {
        throw invalidRequest('NAI 生图接口必须是 HTTP(S) URL，且不能包含 # 片段', 'config');
    }
    return getNaiEndpoints(endpoint).generate;
}

// Validate the serialized body after plugin hooks (including any toJSON hooks).
export function serializeNaiGenerationPayload(payload) {
    let body;
    let request;
    try {
        body = JSON.stringify(payload);
        request = JSON.parse(body);
    } catch {
        throw invalidRequest('NAI 请求参数不是有效的 JSON');
    }

    const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
    const hasText = value => typeof value === 'string' && value.trim().length > 0;
    if (!isObject(request)) throw invalidRequest('NAI 请求参数必须是对象');
    if (!hasText(request.input)) throw invalidRequest('NAI 提示词不能为空');
    if (!hasText(request.model)) throw invalidRequest('NAI 模型不能为空');
    if (request.action !== 'generate') throw invalidRequest('NAI action 必须为 generate');

    const parameters = request.parameters;
    if (!isObject(parameters)) {
        throw invalidRequest('NAI parameters 必须是对象');
    }
    for (const field of ['width', 'height', 'steps']) {
        if (!Number.isInteger(parameters[field]) || parameters[field] <= 0) {
            throw invalidRequest(`NAI 参数 ${field} 必须是正整数`);
        }
    }
    if (!hasText(parameters.sampler)) throw invalidRequest('NAI 采样器不能为空');
    if (!Number.isFinite(parameters.scale)) throw invalidRequest('NAI scale 必须是有限数字');
    if (!Number.isInteger(parameters.seed) || parameters.seed < 0) throw invalidRequest('NAI seed 必须是非负整数');
    if (parameters.n_samples !== 1) {
        throw invalidRequest('NAI n_samples 必须为 1');
    }
    return body;
}
