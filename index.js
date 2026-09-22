import { eventSource, event_types, saveSettingsDebounced, getCurrentChatId, saveChatDebounced, saveChat, getRequestHeaders as getStRequestHeaders } from '../../../../script.js';
import { extension_settings, getContext } from '../../../extensions.js';
import { saveSettings } from '../../../../script.js';

// ==================== Embedded JSZip Library ====================
const bundledJsZipFactory = function(){return function s(a,o,h){function u(r,e){if(!o[r]){if(!a[r]){var t="function"==typeof require&&require;if(!e&&t)return t(r,!0);if(l)return l(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[r]={exports:{}};a[r][0].call(i.exports,function(e){var t=a[r][1][e];return u(t||e)},i,i.exports,s,a,o,h)}return o[r].exports}for(var l="function"==typeof require&&require,e=0;e<h.length;e++)u(h[e]);return u}({1:[function(e,t,r){"use strict";var d=e("./utils"),c=e("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(e){for(var t,r,n,i,s,a,o,h=[],u=0,l=e.length,f=l,c="string"!==d.getTypeOf(e);u<e.length;)f=l-u,n=c?(t=e[u++],r=u<l?e[u++]:0,u<l?e[u++]:0):(t=e.charCodeAt(u++),r=u<l?e.charCodeAt(u++):0,u<l?e.charCodeAt(u++):0),i=t>>2,s=(3&t)<<4|r>>4,a=1<f?(15&r)<<2|n>>6:64,o=2<f?63&n:64,h.push(p.charAt(i)+p.charAt(s)+p.charAt(a)+p.charAt(o));return h.join("")},r.decode=function(e){var t,r,n,i,s,a,o=0,h=0,u="data:";if(e.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var l,f=3*(e=e.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(e.charAt(e.length-1)===p.charAt(64)&&f--,e.charAt(e.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(l=c.uint8array?new Uint8Array(0|f):new Array(0|f);o<e.length;)t=p.indexOf(e.charAt(o++))<<2|(i=p.indexOf(e.charAt(o++)))>>4,r=(15&i)<<4|(s=p.indexOf(e.charAt(o++)))>>2,n=(3&s)<<6|(a=p.indexOf(e.charAt(o++))),l[h++]=t,64!==s&&(l[h++]=r),64!==a&&(l[h++]=n);return l}},{"./support":30,"./utils":32}],2:[function(e,t,r){"use strict";var n=e("./external"),i=e("./stream/DataWorker"),s=e("./stream/Crc32Probe"),a=e("./stream/DataLengthProbe");function o(e,t,r,n,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=r,this.compression=n,this.compressedContent=i}o.prototype={getContentWorker:function(){var e=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),t=this;return e.on("end",function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),e},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(e,t,r){return e.pipe(new s).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",t)},t.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,t,r){"use strict";var n=e("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},r.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,t,r){"use strict";var n=e("./utils");var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t){return void 0!==e&&e.length?"string"!==n.getTypeOf(e)?function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}(0|t,e,e.length,0):function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t.charCodeAt(a))];return-1^e}(0|t,e,e.length,0):0}},{"./utils":32}],5:[function(e,t,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(e,t,r){"use strict";var n=null;n="undefined"!=typeof Promise?Promise:e("lie"),t.exports={Promise:n}},{lie:37}],7:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,i=e("pako"),s=e("./utils"),a=e("./stream/GenericWorker"),o=n?"uint8array":"array";function h(e,t){a.call(this,"FlateWorker/"+e),this._pako=null,this._pakoAction=e,this._pakoOptions=t,this.meta={}}r.magic="\b\0",s.inherits(h,a),h.prototype.processChunk=function(e){this.meta=e.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,e.data),!1)},h.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var t=this;this._pako.onData=function(e){t.push({data:e,meta:t.meta})}},r.compressWorker=function(e){return new h("Deflate",e)},r.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,t,r){"use strict";function A(e,t){var r,n="";for(r=0;r<t;r++)n+=String.fromCharCode(255&e),e>>>=8;return n}function n(e,t,r,n,i,s){var a,o,h=e.file,u=e.compression,l=s!==O.utf8encode,f=I.transformTo("string",s(h.name)),c=I.transformTo("string",O.utf8encode(h.name)),d=h.comment,p=I.transformTo("string",s(d)),m=I.transformTo("string",O.utf8encode(d)),_=c.length!==h.name.length,g=m.length!==d.length,b="",v="",y="",w=h.dir,k=h.date,x={crc32:0,compressedSize:0,uncompressedSize:0};t&&!r||(x.crc32=e.crc32,x.compressedSize=e.compressedSize,x.uncompressedSize=e.uncompressedSize);var S=0;t&&(S|=8),l||!_&&!g||(S|=2048);var z=0,C=0;w&&(z|=16),"UNIX"===i?(C=798,z|=function(e,t){var r=e;return e||(r=t?16893:33204),(65535&r)<<16}(h.unixPermissions,w)):(C=20,z|=function(e){return 63&(e||0)}(h.dosPermissions)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v=A(1,1)+A(B(f),4)+c,b+="up"+A(v.length,2)+v),g&&(y=A(1,1)+A(B(p),4)+m,b+="uc"+A(y.length,2)+y);var E="";return E+="\n\0",E+=A(S,2),E+=u.magic,E+=A(a,2),E+=A(o,2),E+=A(x.crc32,4),E+=A(x.compressedSize,4),E+=A(x.uncompressedSize,4),E+=A(f.length,2),E+=A(b.length,2),{fileRecord:R.LOCAL_FILE_HEADER+E+f+b,dirRecord:R.CENTRAL_FILE_HEADER+A(C,2)+E+A(p.length,2)+"\0\0\0\0"+A(z,4)+A(n,4)+f+b+p}}var I=e("../utils"),i=e("../stream/GenericWorker"),O=e("../utf8"),B=e("../crc32"),R=e("../signature");function s(e,t,r,n){i.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=r,this.encodeFileName=n,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}I.inherits(s,i),s.prototype.push=function(e){var t=e.meta.percent||0,r=this.entriesCount,n=this._sources.length;this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,i.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:r?(t+100*(r-n-1))/r:100}}))},s.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name;var t=this.streamFiles&&!e.file.dir;if(t){var r=n(e,t,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else this.accumulate=!0},s.prototype.closedSource=function(e){this.accumulate=!1;var t=this.streamFiles&&!e.file.dir,r=n(e,t,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(r.dirRecord),t)this.push({data:function(e){return R.DATA_DESCRIPTOR+A(e.crc32,4)+A(e.compressedSize,4)+A(e.uncompressedSize,4)}(e),meta:{percent:100}});else for(this.push({data:r.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},s.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}});var r=this.bytesWritten-e,n=function(e,t,r,n,i){var s=I.transformTo("string",i(n));return R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+A(e,2)+A(e,2)+A(t,4)+A(r,4)+A(s.length,2)+s}(this.dirRecords.length,r,e,this.zipComment,this.encodeFileName);this.push({data:n,meta:{percent:100}})},s.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},s.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end()}),e.on("error",function(e){t.error(e)}),this},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},s.prototype.error=function(e){var t=this._sources;if(!i.prototype.error.call(this,e))return!1;for(var r=0;r<t.length;r++)try{t[r].error(e)}catch(e){}return!0},s.prototype.lock=function(){i.prototype.lock.call(this);for(var e=this._sources,t=0;t<e.length;t++)e[t].lock()},t.exports=s},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,t,r){"use strict";var u=e("../compressions"),n=e("./ZipFileWorker");r.generateWorker=function(e,a,t){var o=new n(a.streamFiles,t,a.platform,a.encodeFileName),h=0;try{e.forEach(function(e,t){h++;var r=function(e,t){var r=e||t,n=u[r];if(!n)throw new Error(r+" is not a valid compression method !");return n}(t.options.compression,a.compression),n=t.options.compressionOptions||a.compressionOptions||{},i=t.dir,s=t.date;t._compressWorker(r,n).withStreamInfo("file",{name:e,dir:i,date:s,comment:t.comment||"",unixPermissions:t.unixPermissions,dosPermissions:t.dosPermissions}).pipe(o)}),o.entriesCount=h}catch(e){o.error(e)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,r){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var e=new n;for(var t in this)"function"!=typeof this[t]&&(e[t]=this[t]);return e}}(n.prototype=e("./object")).loadAsync=e("./load"),n.support=e("./support"),n.defaults=e("./defaults"),n.version="3.10.1",n.loadAsync=function(e,t){return(new n).loadAsync(e,t)},n.external=e("./external"),t.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,t,r){"use strict";var u=e("./utils"),i=e("./external"),n=e("./utf8"),s=e("./zipEntries"),a=e("./stream/Crc32Probe"),l=e("./nodejsUtils");function f(n){return new i.Promise(function(e,t){var r=n.decompressed.getContentWorker().pipe(new a);r.on("error",function(e){t(e)}).on("end",function(){r.streamInfo.crc32!==n.decompressed.crc32?t(new Error("Corrupted zip : CRC32 mismatch")):e()}).resume()})}t.exports=function(e,o){var h=this;return o=u.extend(o||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:n.utf8decode}),l.isNode&&l.isStream(e)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):u.prepareContent("the loaded zip file",e,!0,o.optimizedBinaryString,o.base64).then(function(e){var t=new s(o);return t.load(e),t}).then(function(e){var t=[i.Promise.resolve(e)],r=e.files;if(o.checkCRC32)for(var n=0;n<r.length;n++)t.push(f(r[n]));return i.Promise.all(t)}).then(function(e){for(var t=e.shift(),r=t.files,n=0;n<r.length;n++){var i=r[n],s=i.fileNameStr,a=u.resolve(i.fileNameStr);h.file(a,i.decompressed,{binary:!0,optimizedBinaryString:!0,date:i.date,dir:i.dir,comment:i.fileCommentStr.length?i.fileCommentStr:null,unixPermissions:i.unixPermissions,dosPermissions:i.dosPermissions,createFolders:o.createFolders}),i.dir||(h.file(a).unsafeOriginalName=s)}return t.zipComment.length&&(h.comment=t.zipComment),h})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../stream/GenericWorker");function s(e,t){i.call(this,"Nodejs stream input adapter for "+e),this._upstreamEnded=!1,this._bindStream(t)}n.inherits(s,i),s.prototype._bindStream=function(e){var t=this;(this._stream=e).pause(),e.on("data",function(e){t.push({data:e,meta:{percent:0}})}).on("error",function(e){t.isPaused?this.generatedError=e:t.error(e)}).on("end",function(){t.isPaused?t._upstreamEnded=!0:t.end()})},s.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,t,r){"use strict";var i=e("readable-stream").Readable;function n(e,t,r){i.call(this,t),this._helper=e;var n=this;e.on("data",function(e,t){n.push(e)||n._helper.pause(),r&&r(t)}).on("error",function(e){n.emit("error",e)}).on("end",function(){n.push(null)})}e("../utils").inherits(n,i),n.prototype._read=function(){this._helper.resume()},t.exports=n},{"../utils":32,"readable-stream":16}],14:[function(e,t,r){"use strict";t.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(e,t);if("number"==typeof e)throw new Error('The "data" argument must not be a number');return new Buffer(e,t)},allocBuffer:function(e){if(Buffer.alloc)return Buffer.alloc(e);var t=new Buffer(e);return t.fill(0),t},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&"function"==typeof e.on&&"function"==typeof e.pause&&"function"==typeof e.resume}}},{}],15:[function(e,t,r){"use strict";function s(e,t,r){var n,i=u.getTypeOf(t),s=u.extend(r||{},f);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(e=g(e)),s.createFolders&&(n=_(e))&&b.call(this,n,!0);var a="string"===i&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!a),(t instanceof c&&0===t.uncompressedSize||s.dir||!t||0===t.length)&&(s.base64=!1,s.binary=!0,t="",s.compression="STORE",i="string");var o=null;o=t instanceof c||t instanceof l?t:p.isNode&&p.isStream(t)?new m(e,t):u.prepareContent(e,t,s.binary,s.optimizedBinaryString,s.base64);var h=new d(e,o,s);this.files[e]=h}var i=e("./utf8"),u=e("./utils"),l=e("./stream/GenericWorker"),a=e("./stream/StreamHelper"),f=e("./defaults"),c=e("./compressedObject"),d=e("./zipObject"),o=e("./generate"),p=e("./nodejsUtils"),m=e("./nodejs/NodejsStreamInputAdapter"),_=function(e){"/"===e.slice(-1)&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf("/");return 0<t?e.substring(0,t):""},g=function(e){return"/"!==e.slice(-1)&&(e+="/"),e},b=function(e,t){return t=void 0!==t?t:f.createFolders,e=g(e),this.files[e]||s.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]};function h(e){return"[object RegExp]"===Object.prototype.toString.call(e)}var n={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(e){var t,r,n;for(t in this.files)n=this.files[t],(r=t.slice(this.root.length,t.length))&&t.slice(0,this.root.length)===this.root&&e(r,n)},filter:function(r){var n=[];return this.forEach(function(e,t){r(e,t)&&n.push(t)}),n},file:function(e,t,r){if(1!==arguments.length)return e=this.root+e,s.call(this,e,t,r),this;if(h(e)){var n=e;return this.filter(function(e,t){return!t.dir&&n.test(e)})}var i=this.files[this.root+e];return i&&!i.dir?i:null},folder:function(r){if(!r)return this;if(h(r))return this.filter(function(e,t){return t.dir&&r.test(e)});var e=this.root+r,t=b.call(this,e),n=this.clone();return n.root=t.name,n},remove:function(r){r=this.root+r;var e=this.files[r];if(e||("/"!==r.slice(-1)&&(r+="/"),e=this.files[r]),e&&!e.dir)delete this.files[r];else for(var t=this.filter(function(e,t){return t.name.slice(0,r.length)===r}),n=0;n<t.length;n++)delete this.files[t[n].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(e){var t,r={};try{if((r=u.extend(e||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");u.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var n=r.comment||this.comment||"";t=o.generateWorker(this,r,n)}catch(e){(t=new l("error")).error(e)}return new a(t,r.type||"string",r.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return(e=e||{}).type||(e.type="nodebuffer"),this.generateInternalStream(e).toNodejsStream(t)}};t.exports=n},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,t,r){"use strict";t.exports=e("stream")},{stream:void 0}],17:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e);for(var t=0;t<this.data.length;t++)e[t]=255&e[t]}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data[this.zero+e]},i.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===t&&this.data[s+1]===r&&this.data[s+2]===n&&this.data[s+3]===i)return s-this.zero;return-1},i.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.readData(4);return t===s[0]&&r===s[1]&&n===s[2]&&i===s[3]},i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return[];var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],18:[function(e,t,r){"use strict";var n=e("../utils");function i(e){this.data=e,this.length=e.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(this.length<this.zero+e||e<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?")},setIndex:function(e){this.checkIndex(e),this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(){},readInt:function(e){var t,r=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)r=(r<<8)+this.byteAt(t);return this.index+=e,r},readString:function(e){return n.transformTo("string",this.readData(e))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC(1980+(e>>25&127),(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=i},{"../utils":32}],19:[function(e,t,r){"use strict";var n=e("./Uint8ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},i.prototype.readAndCheckSignature=function(e){return e===this.readData(4)},i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],21:[function(e,t,r){"use strict";var n=e("./ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return new Uint8Array(0);var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../support"),s=e("./ArrayReader"),a=e("./StringReader"),o=e("./NodeBufferReader"),h=e("./Uint8ArrayReader");t.exports=function(e){var t=n.getTypeOf(e);return n.checkSupport(t),"string"!==t||i.uint8array?"nodebuffer"===t?new o(e):i.uint8array?new h(n.transformTo("uint8array",e)):new s(n.transformTo("array",e)):new a(e)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,t,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b"},{}],24:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../utils");function s(e){n.call(this,"ConvertWorker to "+e),this.destType=e}i.inherits(s,n),s.prototype.processChunk=function(e){this.push({data:i.transformTo(this.destType,e.data),meta:e.meta})},t.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(s,n),s.prototype.processChunk=function(e){this.streamInfo.crc32=i(e.data,this.streamInfo.crc32||0),this.push(e)},t.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataLengthProbe for "+e),this.propName=e,this.withStreamInfo(e,0)}n.inherits(s,i),s.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length}i.prototype.processChunk.call(this,e)},t.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataWorker");var t=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=n.getTypeOf(e),t.isPaused||t._tickAndRepeat()},function(e){t.error(e)})}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var e=null,t=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":e=this.data.substring(this.index,t);break;case"uint8array":e=this.data.subarray(this.index,t);break;case"array":case"nodebuffer":e=this.data.slice(this.index,t)}return this.index=t,this.push({data:e,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(e,t,r){"use strict";function n(e){this.name=e||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(e){this.emit("data",e)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(e){this.emit("error",e)}return!0},error:function(e){return!this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit("error",e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(e,t){if(this._listeners[e])for(var r=0;r<this._listeners[e].length;r++)this._listeners[e][r].call(this,t)},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.end()}),e.on("error",function(e){t.error(e)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,e)&&(this.streamInfo[e]=this.extraStreamInfo[e])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var e="Worker "+this.name;return this.previous?this.previous+" -> "+e:e}},t.exports=n},{}],29:[function(e,t,r){"use strict";var h=e("../utils"),i=e("./ConvertWorker"),s=e("./GenericWorker"),u=e("../base64"),n=e("../support"),a=e("../external"),o=null;if(n.nodestream)try{o=e("../nodejs/NodejsStreamOutputAdapter")}catch(e){}function l(e,o){return new a.Promise(function(t,r){var n=[],i=e._internalType,s=e._outputType,a=e._mimeType;e.on("data",function(e,t){n.push(e),o&&o(t)}).on("error",function(e){n=[],r(e)}).on("end",function(){try{var e=function(e,t,r){switch(e){case"blob":return h.newBlob(h.transformTo("arraybuffer",t),r);case"base64":return u.encode(t);default:return h.transformTo(e,t)}}(s,function(e,t){var r,n=0,i=null,s=0;for(r=0;r<t.length;r++)s+=t[r].length;switch(e){case"string":return t.join("");case"array":return Array.prototype.concat.apply([],t);case"uint8array":for(i=new Uint8Array(s),r=0;r<t.length;r++)i.set(t[r],n),n+=t[r].length;return i;case"nodebuffer":return Buffer.concat(t);default:throw new Error("concat : unsupported type '"+e+"'")}}(i,n),a);t(e)}catch(e){r(e)}n=[]}).resume()})}function f(e,t,r){var n=t;switch(t){case"blob":case"arraybuffer":n="uint8array";break;case"base64":n="string"}try{this._internalType=n,this._outputType=t,this._mimeType=r,h.checkSupport(n),this._worker=e.pipe(new i(n)),e.lock()}catch(e){this._worker=new s("error"),this._worker.error(e)}}f.prototype={accumulate:function(e){return l(this,e)},on:function(e,t){var r=this;return"data"===e?this._worker.on(e,function(e){t.call(r,e.data,e.meta)}):this._worker.on(e,function(){h.delay(t,arguments,r)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},e)}},t.exports=f},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,t,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else{var n=new ArrayBuffer(0);try{r.blob=0===new Blob([n],{type:"application/zip"}).size}catch(e){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),r.blob=0===i.getBlob("application/zip").size}catch(e){r.blob=!1}}}try{r.nodestream=!!e("readable-stream").Readable}catch(e){r.nodestream=!1}},{"readable-stream":16}],31:[function(e,t,s){"use strict";for(var o=e("./utils"),h=e("./support"),r=e("./nodejsUtils"),n=e("./stream/GenericWorker"),u=new Array(256),i=0;i<256;i++)u[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;u[254]=u[254]=1;function a(){n.call(this,"utf-8 decode"),this.leftOver=null}function l(){n.call(this,"utf-8 encode")}s.utf8encode=function(e){return h.nodebuffer?r.newBufferFrom(e,"utf-8"):function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=h.uint8array?new Uint8Array(o):new Array(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t}(e)},s.utf8decode=function(e){return h.nodebuffer?o.transformTo("nodebuffer",e).toString("utf-8"):function(e){var t,r,n,i,s=e.length,a=new Array(2*s);for(t=r=0;t<s;)if((n=e[t++])<128)a[r++]=n;else if(4<(i=u[n]))a[r++]=65533,t+=i-1;else{for(n&=2===i?31:3===i?15:7;1<i&&t<s;)n=n<<6|63&e[t++],i--;1<i?a[r++]=65533:n<65536?a[r++]=n:(n-=65536,a[r++]=55296|n>>10&1023,a[r++]=56320|1023&n)}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(e=o.transformTo(h.uint8array?"uint8array":"array",e))},o.inherits(a,n),a.prototype.processChunk=function(e){var t=o.transformTo(h.uint8array?"uint8array":"array",e.data);if(this.leftOver&&this.leftOver.length){if(h.uint8array){var r=t;(t=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),t.set(r,this.leftOver.length)}else t=this.leftOver.concat(t);this.leftOver=null}var n=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}(t),i=t;n!==t.length&&(h.uint8array?(i=t.subarray(0,n),this.leftOver=t.subarray(n,t.length)):(i=t.slice(0,n),this.leftOver=t.slice(n,t.length))),this.push({data:s.utf8decode(i),meta:e.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=a,o.inherits(l,n),l.prototype.processChunk=function(e){this.push({data:s.utf8encode(e.data),meta:e.meta})},s.Utf8EncodeWorker=l},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,t,a){"use strict";var o=e("./support"),h=e("./base64"),r=e("./nodejsUtils"),u=e("./external");function n(e){return e}function l(e,t){for(var r=0;r<e.length;++r)t[r]=255&e.charCodeAt(r);return t}e("setimmediate"),a.newBlob=function(t,r){a.checkSupport("blob");try{return new Blob([t],{type:r})}catch(e){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return n.append(t),n.getBlob(r)}catch(e){throw new Error("Bug : can't construct the Blob.")}}};var i={stringifyByChunk:function(e,t,r){var n=[],i=0,s=e.length;if(s<=r)return String.fromCharCode.apply(null,e);for(;i<s;)"array"===t||"nodebuffer"===t?n.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+r,s)))):n.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+r,s)))),i+=r;return n.join("")},stringifyByChar:function(e){for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(e){return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(e){return!1}}()}};function s(e){var t=65536,r=a.getTypeOf(e),n=!0;if("uint8array"===r?n=i.applyCanBeUsed.uint8array:"nodebuffer"===r&&(n=i.applyCanBeUsed.nodebuffer),n)for(;1<t;)try{return i.stringifyByChunk(e,r,t)}catch(e){t=Math.floor(t/2)}return i.stringifyByChar(e)}function f(e,t){for(var r=0;r<e.length;r++)t[r]=e[r];return t}a.applyFromCharCode=s;var c={};c.string={string:n,array:function(e){return l(e,new Array(e.length))},arraybuffer:function(e){return c.string.uint8array(e).buffer},uint8array:function(e){return l(e,new Uint8Array(e.length))},nodebuffer:function(e){return l(e,r.allocBuffer(e.length))}},c.array={string:s,array:n,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(e)}},c.arraybuffer={string:function(e){return s(new Uint8Array(e))},array:function(e){return f(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:n,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(new Uint8Array(e))}},c.uint8array={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:n,nodebuffer:function(e){return r.newBufferFrom(e)}},c.nodebuffer={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return c.nodebuffer.uint8array(e).buffer},uint8array:function(e){return f(e,new Uint8Array(e.length))},nodebuffer:n},a.transformTo=function(e,t){if(t=t||"",!e)return t;a.checkSupport(e);var r=a.getTypeOf(t);return c[r][e](t)},a.resolve=function(e){for(var t=e.split("/"),r=[],n=0;n<t.length;n++){var i=t[n];"."===i||""===i&&0!==n&&n!==t.length-1||(".."===i?r.pop():r.push(i))}return r.join("/")},a.getTypeOf=function(e){return"string"==typeof e?"string":"[object Array]"===Object.prototype.toString.call(e)?"array":o.nodebuffer&&r.isBuffer(e)?"nodebuffer":o.uint8array&&e instanceof Uint8Array?"uint8array":o.arraybuffer&&e instanceof ArrayBuffer?"arraybuffer":void 0},a.checkSupport=function(e){if(!o[e.toLowerCase()])throw new Error(e+" is not supported by this platform")},a.MAX_VALUE_16BITS=65535,a.MAX_VALUE_32BITS=-1,a.pretty=function(e){var t,r,n="";for(r=0;r<(e||"").length;r++)n+="\\x"+((t=e.charCodeAt(r))<16?"0":"")+t.toString(16).toUpperCase();return n},a.delay=function(e,t,r){setImmediate(function(){e.apply(r||null,t||[])})},a.inherits=function(e,t){function r(){}r.prototype=t.prototype,e.prototype=new r},a.extend=function(){var e,t,r={};for(e=0;e<arguments.length;e++)for(t in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],t)&&void 0===r[t]&&(r[t]=arguments[e][t]);return r},a.prepareContent=function(r,e,n,i,s){return u.Promise.resolve(e).then(function(n){return o.blob&&(n instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(n)))&&"undefined"!=typeof FileReader?new u.Promise(function(t,r){var e=new FileReader;e.onload=function(e){t(e.target.result)},e.onerror=function(e){r(e.target.error)},e.readAsArrayBuffer(n)}):n}).then(function(e){var t=a.getTypeOf(e);return t?("arraybuffer"===t?e=a.transformTo("uint8array",e):"string"===t&&(s?e=h.decode(e):n&&!0!==i&&(e=function(e){return l(e,o.uint8array?new Uint8Array(e.length):new Array(e.length))}(e))),e):u.Promise.reject(new Error("Can't read the data of '"+r+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),i=e("./utils"),s=e("./signature"),a=e("./zipEntry"),o=e("./support");function h(e){this.files=[],this.loadOptions=e}h.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(t)+", expected "+i.pretty(e)+")")}},isSignature:function(e,t){var r=this.reader.index;this.reader.setIndex(e);var n=this.reader.readString(4)===t;return this.reader.setIndex(r),n},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength),t=o.uint8array?"uint8array":"array",r=i.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var e,t,r,n=this.zip64EndOfCentralSize-44;0<n;)e=this.reader.readInt(2),t=this.reader.readInt(4),r=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:r}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var e,t;for(e=0;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes()},readCentralDir:function(){var e;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(e=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(e);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(e<0)throw!this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory");this.reader.setIndex(e);var t=e;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(e=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(e),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var n=t-r;if(0<n)this.isSignature(t,s.CENTRAL_FILE_HEADER)||(this.reader.zero=n);else if(n<0)throw new Error("Corrupted zip: missing "+Math.abs(n)+" bytes.")},prepareReader:function(e){this.reader=n(e)},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),s=e("./utils"),i=e("./compressedObject"),a=e("./crc32"),o=e("./utf8"),h=e("./compressions"),u=e("./support");function l(e,t){this.options=e,this.loadOptions=t}l.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(e){var t,r;if(e.skip(22),this.fileNameLength=e.readInt(2),r=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(t=function(e){for(var t in h)if(Object.prototype.hasOwnProperty.call(h,t)&&h[t].magic===e)return h[t];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new i(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize))},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4);var t=e.readInt(2);if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==e&&(this.dosPermissions=63&this.externalFileAttributes),3==e&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var e=n(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4))}},readExtraFields:function(e){var t,r,n,i=e.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});e.index+4<i;)t=e.readInt(2),r=e.readInt(2),n=e.readData(r),this.extraFields[t]={id:t,length:r,value:n};e.setIndex(i)},handleUTF8:function(){var e=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var t=this.findExtraFieldUnicodePath();if(null!==t)this.fileNameStr=t;else{var r=s.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var n=this.findExtraFieldUnicodeComment();if(null!==n)this.fileCommentStr=n;else{var i=s.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(i)}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileName)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileComment)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null}},t.exports=l},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,t,r){"use strict";function n(e,t,r){this.name=e,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=t,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions}}var s=e("./stream/StreamHelper"),i=e("./stream/DataWorker"),a=e("./utf8"),o=e("./compressedObject"),h=e("./stream/GenericWorker");n.prototype={internalStream:function(e){var t=null,r="string";try{if(!e)throw new Error("No output type specified.");var n="string"===(r=e.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),t=this._decompressWorker();var i=!this._dataBinary;i&&!n&&(t=t.pipe(new a.Utf8EncodeWorker)),!i&&n&&(t=t.pipe(new a.Utf8DecodeWorker))}catch(e){(t=new h("error")).error(e)}return new s(t,r,"")},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||"nodebuffer").toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof o&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,e,t)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof h?this._data:new i(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],l=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)n.prototype[u[f]]=l;t.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,l,t){(function(t){"use strict";var r,n,e=t.MutationObserver||t.WebKitMutationObserver;if(e){var i=0,s=new e(u),a=t.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=i=++i%2}}else if(t.setImmediate||void 0===t.MessageChannel)r="document"in t&&"onreadystatechange"in t.document.createElement("script")?function(){var e=t.document.createElement("script");e.onreadystatechange=function(){u(),e.onreadystatechange=null,e.parentNode.removeChild(e),e=null},t.document.documentElement.appendChild(e)}:function(){setTimeout(u,0)};else{var o=new t.MessageChannel;o.port1.onmessage=u,r=function(){o.port2.postMessage(0)}}var h=[];function u(){var e,t;n=!0;for(var r=h.length;r;){for(t=h,h=[],e=-1;++e<r;)t[e]();r=h.length}n=!1}l.exports=function(e){1!==h.push(e)||n||r()}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(e,t,r){"use strict";var i=e("immediate");function u(){}var l={},s=["REJECTED"],a=["FULFILLED"],n=["PENDING"];function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=n,this.queue=[],this.outcome=void 0,e!==u&&d(this,e)}function h(e,t,r){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function f(t,r,n){i(function(){var e;try{e=r(n)}catch(e){return l.reject(t,e)}e===t?l.reject(t,new TypeError("Cannot resolve promise with itself")):l.resolve(t,e)})}function c(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments)}}function d(t,e){var r=!1;function n(e){r||(r=!0,l.reject(t,e))}function i(e){r||(r=!0,l.resolve(t,e))}var s=p(function(){e(i,n)});"error"===s.status&&n(s.value)}function p(e,t){var r={};try{r.value=e(t),r.status="success"}catch(e){r.status="error",r.value=e}return r}(t.exports=o).prototype.finally=function(t){if("function"!=typeof t)return this;var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})})},o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===a||"function"!=typeof t&&this.state===s)return this;var r=new this.constructor(u);this.state!==n?f(r,this.state===a?e:t,this.outcome):this.queue.push(new h(r,e,t));return r},h.prototype.callFulfilled=function(e){l.resolve(this.promise,e)},h.prototype.otherCallFulfilled=function(e){f(this.promise,this.onFulfilled,e)},h.prototype.callRejected=function(e){l.reject(this.promise,e)},h.prototype.otherCallRejected=function(e){f(this.promise,this.onRejected,e)},l.resolve=function(e,t){var r=p(c,t);if("error"===r.status)return l.reject(e,r.value);var n=r.value;if(n)d(e,n);else{e.state=a,e.outcome=t;for(var i=-1,s=e.queue.length;++i<s;)e.queue[i].callFulfilled(t)}return e},l.reject=function(e,t){e.state=s,e.outcome=t;for(var r=-1,n=e.queue.length;++r<n;)e.queue[r].callRejected(t);return e},o.resolve=function(e){if(e instanceof this)return e;return l.resolve(new this(u),e)},o.reject=function(e){var t=new this(u);return l.reject(t,e)},o.all=function(e){var r=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var n=e.length,i=!1;if(!n)return this.resolve([]);var s=new Array(n),a=0,t=-1,o=new this(u);for(;++t<n;)h(e[t],t);return o;function h(e,t){r.resolve(e).then(function(e){s[t]=e,++a!==n||i||(i=!0,l.resolve(o,s))},function(e){i||(i=!0,l.reject(o,e))})}},o.race=function(e){var t=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var r=e.length,n=!1;if(!r)return this.resolve([]);var i=-1,s=new this(u);for(;++i<r;)a=e[i],t.resolve(a).then(function(e){n||(n=!0,l.resolve(s,e))},function(e){n||(n=!0,l.reject(s,e))});var a;return s}},{immediate:36}],38:[function(e,t,r){"use strict";var n={};(0,e("./lib/utils/common").assign)(n,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),t.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,r){"use strict";var a=e("./zlib/deflate"),o=e("./utils/common"),h=e("./utils/strings"),i=e("./zlib/messages"),s=e("./zlib/zstream"),u=Object.prototype.toString,l=0,f=-1,c=0,d=8;function p(e){if(!(this instanceof p))return new p(e);this.options=o.assign({level:f,method:d,chunkSize:16384,windowBits:15,memLevel:8,strategy:c,to:""},e||{});var t=this.options;t.raw&&0<t.windowBits?t.windowBits=-t.windowBits:t.gzip&&0<t.windowBits&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(r!==l)throw new Error(i[r]);if(t.header&&a.deflateSetHeader(this.strm,t.header),t.dictionary){var n;if(n="string"==typeof t.dictionary?h.string2buf(t.dictionary):"[object ArrayBuffer]"===u.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,(r=a.deflateSetDictionary(this.strm,n))!==l)throw new Error(i[r]);this._dict_set=!0}}function n(e,t){var r=new p(t);if(r.push(e,!0),r.err)throw r.msg||i[r.err];return r.result}p.prototype.push=function(e,t){var r,n,i=this.strm,s=this.options.chunkSize;if(this.ended)return!1;n=t===~~t?t:!0===t?4:0,"string"==typeof e?i.input=h.string2buf(e):"[object ArrayBuffer]"===u.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;do{if(0===i.avail_out&&(i.output=new o.Buf8(s),i.next_out=0,i.avail_out=s),1!==(r=a.deflate(i,n))&&r!==l)return this.onEnd(r),!(this.ended=!0);0!==i.avail_out&&(0!==i.avail_in||4!==n&&2!==n)||("string"===this.options.to?this.onData(h.buf2binstring(o.shrinkBuf(i.output,i.next_out))):this.onData(o.shrinkBuf(i.output,i.next_out)))}while((0<i.avail_in||0===i.avail_out)&&1!==r);return 4===n?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===l):2!==n||(this.onEnd(l),!(i.avail_out=0))},p.prototype.onData=function(e){this.chunks.push(e)},p.prototype.onEnd=function(e){e===l&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Deflate=p,r.deflate=n,r.deflateRaw=function(e,t){return(t=t||{}).raw=!0,n(e,t)},r.gzip=function(e,t){return(t=t||{}).gzip=!0,n(e,t)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,r){"use strict";var c=e("./zlib/inflate"),d=e("./utils/common"),p=e("./utils/strings"),m=e("./zlib/constants"),n=e("./zlib/messages"),i=e("./zlib/zstream"),s=e("./zlib/gzheader"),_=Object.prototype.toString;function a(e){if(!(this instanceof a))return new a(e);this.options=d.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new i,this.strm.avail_out=0;var r=c.inflateInit2(this.strm,t.windowBits);if(r!==m.Z_OK)throw new Error(n[r]);this.header=new s,c.inflateGetHeader(this.strm,this.header)}function o(e,t){var r=new a(t);if(r.push(e,!0),r.err)throw r.msg||n[r.err];return r.result}a.prototype.push=function(e,t){var r,n,i,s,a,o,h=this.strm,u=this.options.chunkSize,l=this.options.dictionary,f=!1;if(this.ended)return!1;n=t===~~t?t:!0===t?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof e?h.input=p.binstring2buf(e):"[object ArrayBuffer]"===_.call(e)?h.input=new Uint8Array(e):h.input=e,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new d.Buf8(u),h.next_out=0,h.avail_out=u),(r=c.inflate(h,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&l&&(o="string"==typeof l?p.string2buf(l):"[object ArrayBuffer]"===_.call(l)?new Uint8Array(l):l,r=c.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===f&&(r=m.Z_OK,f=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);h.next_out&&(0!==h.avail_out&&r!==m.Z_STREAM_END&&(0!==h.avail_in||n!==m.Z_FINISH&&n!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(i=p.utf8border(h.output,h.next_out),s=h.next_out-i,a=p.buf2string(h.output,i),h.next_out=s,h.avail_out=u-s,s&&d.arraySet(h.output,h.output,i,s,0),this.onData(a)):this.onData(d.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(f=!0)}while((0<h.avail_in||0===h.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(n=m.Z_FINISH),n===m.Z_FINISH?(r=c.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):n!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(h.avail_out=0))},a.prototype.onData=function(e){this.chunks.push(e)},a.prototype.onEnd=function(e){e===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=d.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Inflate=a,r.inflate=o,r.inflateRaw=function(e,t){return(t=t||{}).raw=!0,o(e,t)},r.ungzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var r=t.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])}}return e},r.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,r,n,i){if(t.subarray&&e.subarray)e.set(t.subarray(r,r+n),i);else for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){var t,r,n,i,s,a;for(t=n=0,r=e.length;t<r;t++)n+=e[t].length;for(a=new Uint8Array(n),t=i=0,r=e.length;t<r;t++)s=e[t],a.set(s,i),i+=s.length;return a}},s={arraySet:function(e,t,r,n,i){for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){return[].concat.apply([],e)}};r.setTyped=function(e){e?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,i)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s))},r.setTyped(n)},{}],42:[function(e,t,r){"use strict";var h=e("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(e){i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){s=!1}for(var u=new h.Buf8(256),n=0;n<256;n++)u[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;function l(e,t){if(t<65537&&(e.subarray&&s||!e.subarray&&i))return String.fromCharCode.apply(null,h.shrinkBuf(e,t));for(var r="",n=0;n<t;n++)r+=String.fromCharCode(e[n]);return r}u[254]=u[254]=1,r.string2buf=function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=new h.Buf8(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t},r.buf2binstring=function(e){return l(e,e.length)},r.binstring2buf=function(e){for(var t=new h.Buf8(e.length),r=0,n=t.length;r<n;r++)t[r]=e.charCodeAt(r);return t},r.buf2string=function(e,t){var r,n,i,s,a=t||e.length,o=new Array(2*a);for(r=n=0;r<a;)if((i=e[r++])<128)o[n++]=i;else if(4<(s=u[i]))o[n++]=65533,r+=s-1;else{for(i&=2===s?31:3===s?15:7;1<s&&r<a;)i=i<<6|63&e[r++],s--;1<s?o[n++]=65533:i<65536?o[n++]=i:(i-=65536,o[n++]=55296|i>>10&1023,o[n++]=56320|1023&i)}return l(o,n)},r.utf8border=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}},{"./common":41}],43:[function(e,t,r){"use strict";t.exports=function(e,t,r,n){for(var i=65535&e|0,s=e>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(i=i+t[n++]|0)|0,--a;);i%=65521,s%=65521}return i|s<<16|0}},{}],44:[function(e,t,r){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,t,r){"use strict";var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}},{}],46:[function(e,t,r){"use strict";var h,c=e("../utils/common"),u=e("./trees"),d=e("./adler32"),p=e("./crc32"),n=e("./messages"),l=0,f=4,m=0,_=-2,g=-1,b=4,i=2,v=8,y=9,s=286,a=30,o=19,w=2*s+1,k=15,x=3,S=258,z=S+x+1,C=42,E=113,A=1,I=2,O=3,B=4;function R(e,t){return e.msg=n[t],t}function T(e){return(e<<1)-(4<e?9:0)}function D(e){for(var t=e.length;0<=--t;)e[t]=0}function F(e){var t=e.state,r=t.pending;r>e.avail_out&&(r=e.avail_out),0!==r&&(c.arraySet(e.output,t.pending_buf,t.pending_out,r,e.next_out),e.next_out+=r,t.pending_out+=r,e.total_out+=r,e.avail_out-=r,t.pending-=r,0===t.pending&&(t.pending_out=0))}function N(e,t){u._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,F(e.strm)}function U(e,t){e.pending_buf[e.pending++]=t}function P(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t}function L(e,t){var r,n,i=e.max_chain_length,s=e.strstart,a=e.prev_length,o=e.nice_match,h=e.strstart>e.w_size-z?e.strstart-(e.w_size-z):0,u=e.window,l=e.w_mask,f=e.prev,c=e.strstart+S,d=u[s+a-1],p=u[s+a];e.prev_length>=e.good_match&&(i>>=2),o>e.lookahead&&(o=e.lookahead);do{if(u[(r=t)+a]===p&&u[r+a-1]===d&&u[r]===u[s]&&u[++r]===u[s+1]){s+=2,r++;do{}while(u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&s<c);if(n=S-(c-s),s=c-S,a<n){if(e.match_start=t,o<=(a=n))break;d=u[s+a-1],p=u[s+a]}}}while((t=f[t&l])>h&&0!=--i);return a<=e.lookahead?a:e.lookahead}function j(e){var t,r,n,i,s,a,o,h,u,l,f=e.w_size;do{if(i=e.window_size-e.lookahead-e.strstart,e.strstart>=f+(f-z)){for(c.arraySet(e.window,e.window,f,f,0),e.match_start-=f,e.strstart-=f,e.block_start-=f,t=r=e.hash_size;n=e.head[--t],e.head[t]=f<=n?n-f:0,--r;);for(t=r=f;n=e.prev[--t],e.prev[t]=f<=n?n-f:0,--r;);i+=f}if(0===e.strm.avail_in)break;if(a=e.strm,o=e.window,h=e.strstart+e.lookahead,u=i,l=void 0,l=a.avail_in,u<l&&(l=u),r=0===l?0:(a.avail_in-=l,c.arraySet(o,a.input,a.next_in,l,h),1===a.state.wrap?a.adler=d(a.adler,o,l,h):2===a.state.wrap&&(a.adler=p(a.adler,o,l,h)),a.next_in+=l,a.total_in+=l,l),e.lookahead+=r,e.lookahead+e.insert>=x)for(s=e.strstart-e.insert,e.ins_h=e.window[s],e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+x-1])&e.hash_mask,e.prev[s&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=s,s++,e.insert--,!(e.lookahead+e.insert<x)););}while(e.lookahead<z&&0!==e.strm.avail_in)}function Z(e,t){for(var r,n;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!==r&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r)),e.match_length>=x)if(n=u._tr_tally(e,e.strstart-e.match_start,e.match_length-x),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=x){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,0!=--e.match_length;);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else n=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(n&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function W(e,t){for(var r,n,i;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=x-1,0!==r&&e.prev_length<e.max_lazy_match&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r),e.match_length<=5&&(1===e.strategy||e.match_length===x&&4096<e.strstart-e.match_start)&&(e.match_length=x-1)),e.prev_length>=x&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-x,n=u._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-x),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!=--e.prev_length;);if(e.match_available=0,e.match_length=x-1,e.strstart++,n&&(N(e,!1),0===e.strm.avail_out))return A}else if(e.match_available){if((n=u._tr_tally(e,0,e.window[e.strstart-1]))&&N(e,!1),e.strstart++,e.lookahead--,0===e.strm.avail_out)return A}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(n=u._tr_tally(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function M(e,t,r,n,i){this.good_length=e,this.max_lazy=t,this.nice_length=r,this.max_chain=n,this.func=i}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new c.Buf16(2*w),this.dyn_dtree=new c.Buf16(2*(2*a+1)),this.bl_tree=new c.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new c.Buf16(k+1),this.heap=new c.Buf16(2*s+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new c.Buf16(2*s+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function G(e){var t;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=i,(t=e.state).pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?C:E,e.adler=2===t.wrap?0:1,t.last_flush=l,u._tr_init(t),m):R(e,_)}function K(e){var t=G(e);return t===m&&function(e){e.window_size=2*e.w_size,D(e.head),e.max_lazy_match=h[e.level].max_lazy,e.good_match=h[e.level].good_length,e.nice_match=h[e.level].nice_length,e.max_chain_length=h[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=x-1,e.match_available=0,e.ins_h=0}(e.state),t}function Y(e,t,r,n,i,s){if(!e)return _;var a=1;if(t===g&&(t=6),n<0?(a=0,n=-n):15<n&&(a=2,n-=16),i<1||y<i||r!==v||n<8||15<n||t<0||9<t||s<0||b<s)return R(e,_);8===n&&(n=9);var o=new H;return(e.state=o).strm=e,o.wrap=a,o.gzhead=null,o.w_bits=n,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=i+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new c.Buf8(2*o.w_size),o.head=new c.Buf16(o.hash_size),o.prev=new c.Buf16(o.w_size),o.lit_bufsize=1<<i+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new c.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=t,o.strategy=s,o.method=r,K(e)}h=[new M(0,0,0,0,function(e,t){var r=65535;for(r>e.pending_buf_size-5&&(r=e.pending_buf_size-5);;){if(e.lookahead<=1){if(j(e),0===e.lookahead&&t===l)return A;if(0===e.lookahead)break}e.strstart+=e.lookahead,e.lookahead=0;var n=e.block_start+r;if((0===e.strstart||e.strstart>=n)&&(e.lookahead=e.strstart-n,e.strstart=n,N(e,!1),0===e.strm.avail_out))return A;if(e.strstart-e.block_start>=e.w_size-z&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):(e.strstart>e.block_start&&(N(e,!1),e.strm.avail_out),A)}),new M(4,4,8,4,Z),new M(4,5,16,8,Z),new M(4,6,32,32,Z),new M(4,4,16,16,W),new M(8,16,32,32,W),new M(8,16,128,128,W),new M(8,32,128,256,W),new M(32,128,258,1024,W),new M(32,258,258,4096,W)],r.deflateInit=function(e,t){return Y(e,t,v,15,8,0)},r.deflateInit2=Y,r.deflateReset=K,r.deflateResetKeep=G,r.deflateSetHeader=function(e,t){return e&&e.state?2!==e.state.wrap?_:(e.state.gzhead=t,m):_},r.deflate=function(e,t){var r,n,i,s;if(!e||!e.state||5<t||t<0)return e?R(e,_):_;if(n=e.state,!e.output||!e.input&&0!==e.avail_in||666===n.status&&t!==f)return R(e,0===e.avail_out?-5:_);if(n.strm=e,r=n.last_flush,n.last_flush=t,n.status===C)if(2===n.wrap)e.adler=0,U(n,31),U(n,139),U(n,8),n.gzhead?(U(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),U(n,255&n.gzhead.time),U(n,n.gzhead.time>>8&255),U(n,n.gzhead.time>>16&255),U(n,n.gzhead.time>>24&255),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(U(n,255&n.gzhead.extra.length),U(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(e.adler=p(e.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(U(n,0),U(n,0),U(n,0),U(n,0),U(n,0),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,3),n.status=E);else{var a=v+(n.w_bits-8<<4)<<8;a|=(2<=n.strategy||n.level<2?0:n.level<6?1:6===n.level?2:3)<<6,0!==n.strstart&&(a|=32),a+=31-a%31,n.status=E,P(n,a),0!==n.strstart&&(P(n,e.adler>>>16),P(n,65535&e.adler)),e.adler=1}if(69===n.status)if(n.gzhead.extra){for(i=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending!==n.pending_buf_size));)U(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73)}else n.status=73;if(73===n.status)if(n.gzhead.name){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.gzindex=0,n.status=91)}else n.status=91;if(91===n.status)if(n.gzhead.comment){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.status=103)}else n.status=103;if(103===n.status&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&F(e),n.pending+2<=n.pending_buf_size&&(U(n,255&e.adler),U(n,e.adler>>8&255),e.adler=0,n.status=E)):n.status=E),0!==n.pending){if(F(e),0===e.avail_out)return n.last_flush=-1,m}else if(0===e.avail_in&&T(t)<=T(r)&&t!==f)return R(e,-5);if(666===n.status&&0!==e.avail_in)return R(e,-5);if(0!==e.avail_in||0!==n.lookahead||t!==l&&666!==n.status){var o=2===n.strategy?function(e,t){for(var r;;){if(0===e.lookahead&&(j(e),0===e.lookahead)){if(t===l)return A;break}if(e.match_length=0,r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):3===n.strategy?function(e,t){for(var r,n,i,s,a=e.window;;){if(e.lookahead<=S){if(j(e),e.lookahead<=S&&t===l)return A;if(0===e.lookahead)break}if(e.match_length=0,e.lookahead>=x&&0<e.strstart&&(n=a[i=e.strstart-1])===a[++i]&&n===a[++i]&&n===a[++i]){s=e.strstart+S;do{}while(n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&i<s);e.match_length=S-(s-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=x?(r=u._tr_tally(e,1,e.match_length-x),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):h[n.level].func(n,t);if(o!==O&&o!==B||(n.status=666),o===A||o===O)return 0===e.avail_out&&(n.last_flush=-1),m;if(o===I&&(1===t?u._tr_align(n):5!==t&&(u._tr_stored_block(n,0,0,!1),3===t&&(D(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),F(e),0===e.avail_out))return n.last_flush=-1,m}return t!==f?m:n.wrap<=0?1:(2===n.wrap?(U(n,255&e.adler),U(n,e.adler>>8&255),U(n,e.adler>>16&255),U(n,e.adler>>24&255),U(n,255&e.total_in),U(n,e.total_in>>8&255),U(n,e.total_in>>16&255),U(n,e.total_in>>24&255)):(P(n,e.adler>>>16),P(n,65535&e.adler)),F(e),0<n.wrap&&(n.wrap=-n.wrap),0!==n.pending?m:1)},r.deflateEnd=function(e){var t;return e&&e.state?(t=e.state.status)!==C&&69!==t&&73!==t&&91!==t&&103!==t&&t!==E&&666!==t?R(e,_):(e.state=null,t===E?R(e,-3):m):_},r.deflateSetDictionary=function(e,t){var r,n,i,s,a,o,h,u,l=t.length;if(!e||!e.state)return _;if(2===(s=(r=e.state).wrap)||1===s&&r.status!==C||r.lookahead)return _;for(1===s&&(e.adler=d(e.adler,t,l,0)),r.wrap=0,l>=r.w_size&&(0===s&&(D(r.head),r.strstart=0,r.block_start=0,r.insert=0),u=new c.Buf8(r.w_size),c.arraySet(u,t,l-r.w_size,r.w_size,0),t=u,l=r.w_size),a=e.avail_in,o=e.next_in,h=e.input,e.avail_in=l,e.next_in=0,e.input=t,j(r);r.lookahead>=x;){for(n=r.strstart,i=r.lookahead-(x-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[n+x-1])&r.hash_mask,r.prev[n&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=n,n++,--i;);r.strstart=n,r.lookahead=x-1,j(r)}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=x-1,r.match_available=0,e.next_in=o,e.input=h,e.avail_in=a,r.wrap=s,m},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,r){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,t,r){"use strict";t.exports=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C;r=e.state,n=e.next_in,z=e.input,i=n+(e.avail_in-5),s=e.next_out,C=e.output,a=s-(t-e.avail_out),o=s+(e.avail_out-257),h=r.dmax,u=r.wsize,l=r.whave,f=r.wnext,c=r.window,d=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;e:do{p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=m[d&g];t:for(;;){if(d>>>=y=v>>>24,p-=y,0===(y=v>>>16&255))C[s++]=65535&v;else{if(!(16&y)){if(0==(64&y)){v=m[(65535&v)+(d&(1<<y)-1)];continue t}if(32&y){r.mode=12;break e}e.msg="invalid literal/length code",r.mode=30;break e}w=65535&v,(y&=15)&&(p<y&&(d+=z[n++]<<p,p+=8),w+=d&(1<<y)-1,d>>>=y,p-=y),p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=_[d&b];r:for(;;){if(d>>>=y=v>>>24,p-=y,!(16&(y=v>>>16&255))){if(0==(64&y)){v=_[(65535&v)+(d&(1<<y)-1)];continue r}e.msg="invalid distance code",r.mode=30;break e}if(k=65535&v,p<(y&=15)&&(d+=z[n++]<<p,(p+=8)<y&&(d+=z[n++]<<p,p+=8)),h<(k+=d&(1<<y)-1)){e.msg="invalid distance too far back",r.mode=30;break e}if(d>>>=y,p-=y,(y=s-a)<k){if(l<(y=k-y)&&r.sane){e.msg="invalid distance too far back",r.mode=30;break e}if(S=c,(x=0)===f){if(x+=u-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}}else if(f<y){if(x+=u+f-y,(y-=f)<w){for(w-=y;C[s++]=c[x++],--y;);if(x=0,f<w){for(w-=y=f;C[s++]=c[x++],--y;);x=s-k,S=C}}}else if(x+=f-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}for(;2<w;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],w-=3;w&&(C[s++]=S[x++],1<w&&(C[s++]=S[x++]))}else{for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(w-=3););w&&(C[s++]=C[x++],1<w&&(C[s++]=C[x++]))}break}}break}}while(n<i&&s<o);n-=w=p>>3,d&=(1<<(p-=w<<3))-1,e.next_in=n,e.next_out=s,e.avail_in=n<i?i-n+5:5-(n-i),e.avail_out=s<o?o-s+257:257-(s-o),r.hold=d,r.bits=p}},{}],49:[function(e,t,r){"use strict";var I=e("../utils/common"),O=e("./adler32"),B=e("./crc32"),R=e("./inffast"),T=e("./inftrees"),D=1,F=2,N=0,U=-2,P=1,n=852,i=592;function L(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=P,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new I.Buf32(n),t.distcode=t.distdyn=new I.Buf32(i),t.sane=1,t.back=-1,N):U}function o(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,a(e)):U}function h(e,t){var r,n;return e&&e.state?(n=e.state,t<0?(r=0,t=-t):(r=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?U:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=r,n.wbits=t,o(e))):U}function u(e,t){var r,n;return e?(n=new s,(e.state=n).window=null,(r=h(e,t))!==N&&(e.state=null),r):U}var l,f,c=!0;function j(e){if(c){var t;for(l=new I.Buf32(512),f=new I.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(T(D,e.lens,0,288,l,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;T(F,e.lens,0,32,f,0,e.work,{bits:5}),c=!1}e.lencode=l,e.lenbits=9,e.distcode=f,e.distbits=5}function Z(e,t,r,n){var i,s=e.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),n>=s.wsize?(I.arraySet(s.window,t,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(n<(i=s.wsize-s.wnext)&&(i=n),I.arraySet(s.window,t,r-n,i,s.wnext),(n-=i)?(I.arraySet(s.window,t,r-n,n,0),s.wnext=n,s.whave=s.wsize):(s.wnext+=i,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=i))),0}r.inflateReset=o,r.inflateReset2=h,r.inflateResetKeep=a,r.inflateInit=function(e){return u(e,15)},r.inflateInit2=u,r.inflate=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return U;12===(r=e.state).mode&&(r.mode=13),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,f=o,c=h,x=N;e:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(2&r.wrap&&35615===u){E[r.check=0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0),l=u=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&u)<<8)+(u>>8))%31){e.msg="incorrect header check",r.mode=30;break}if(8!=(15&u)){e.msg="unknown compression method",r.mode=30;break}if(l-=4,k=8+(15&(u>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){e.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,e.adler=r.check=1,r.mode=512&u?10:12,l=u=0;break;case 2:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.flags=u,8!=(255&r.flags)){e.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){e.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=u>>8&1),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=3;case 3:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.time=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,E[2]=u>>>16&255,E[3]=u>>>24&255,r.check=B(r.check,E,4,0)),l=u=0,r.mode=4;case 4:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.xflags=255&u,r.head.os=u>>8),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=5;case 5:if(1024&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length=u,r.head&&(r.head.extra_len=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(d=r.length)&&(d=o),d&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,n,s,d,k)),512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,r.length-=d),r.length))break e;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(65535&r.check)){e.msg="header crc mismatch",r.mode=30;break}l=u=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),e.adler=r.check=0,r.mode=12;break;case 10:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}e.adler=r.check=L(u),l=u=0,r.mode=11;case 11:if(0===r.havedict)return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,2;e.adler=r.check=1,r.mode=12;case 12:if(5===t||6===t)break e;case 13:if(r.last){u>>>=7&l,l-=7&l,r.mode=27;break}for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}switch(r.last=1&u,l-=1,3&(u>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==t)break;u>>>=2,l-=2;break e;case 2:r.mode=17;break;case 3:e.msg="invalid block type",r.mode=30}u>>>=2,l-=2;break;case 14:for(u>>>=7&l,l-=7&l;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if((65535&u)!=(u>>>16^65535)){e.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&u,l=u=0,r.mode=15,6===t)break e;case 15:r.mode=16;case 16:if(d=r.length){if(o<d&&(d=o),h<d&&(d=h),0===d)break e;I.arraySet(i,n,s,d,a),o-=d,s+=d,h-=d,a+=d,r.length-=d;break}r.mode=12;break;case 17:for(;l<14;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.nlen=257+(31&u),u>>>=5,l-=5,r.ndist=1+(31&u),u>>>=5,l-=5,r.ncode=4+(15&u),u>>>=4,l-=4,286<r.nlen||30<r.ndist){e.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.lens[A[r.have++]]=7&u,u>>>=3,l-=3}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(b<16)u>>>=_,l-=_,r.lens[r.have++]=b;else{if(16===b){for(z=_+2;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u>>>=_,l-=_,0===r.have){e.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],d=3+(3&u),u>>>=2,l-=2}else if(17===b){for(z=_+3;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=3+(7&(u>>>=_)),u>>>=3,l-=3}else{for(z=_+7;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=11+(127&(u>>>=_)),u>>>=7,l-=7}if(r.have+d>r.nlen+r.ndist){e.msg="invalid bit length repeat",r.mode=30;break}for(;d--;)r.lens[r.have++]=k}}if(30===r.mode)break;if(0===r.lens[256]){e.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){e.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===t)break e;case 20:r.mode=21;case 21:if(6<=o&&258<=h){e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,R(e,c),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(g&&0==(240&g)){for(v=_,y=g,w=b;g=(C=r.lencode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,r.length=b,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){e.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[u&(1<<r.distbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(0==(240&g)){for(v=_,y=g,w=b;g=(C=r.distcode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,64&g){e.msg="invalid distance code",r.mode=30;break}r.offset=b,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.offset+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){e.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===h)break e;if(d=c-h,r.offset>d){if((d=r.offset-d)>r.whave&&r.sane){e.msg="invalid distance too far back",r.mode=30;break}p=d>r.wnext?(d-=r.wnext,r.wsize-d):r.wnext-d,d>r.length&&(d=r.length),m=r.window}else m=i,p=a-r.offset,d=r.length;for(h<d&&(d=h),h-=d,r.length-=d;i[a++]=m[p++],--d;);0===r.length&&(r.mode=21);break;case 26:if(0===h)break e;i[a++]=r.length,h--,r.mode=21;break;case 27:if(r.wrap){for(;l<32;){if(0===o)break e;o--,u|=n[s++]<<l,l+=8}if(c-=h,e.total_out+=c,r.total+=c,c&&(e.adler=r.check=r.flags?B(r.check,i,c,a-c):O(r.check,i,c,a-c)),c=h,(r.flags?u:L(u))!==r.check){e.msg="incorrect data check",r.mode=30;break}l=u=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(4294967295&r.total)){e.msg="incorrect length check",r.mode=30;break}l=u=0}r.mode=29;case 29:x=1;break e;case 30:x=-3;break e;case 31:return-4;case 32:default:return U}return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,(r.wsize||c!==e.avail_out&&r.mode<30&&(r.mode<27||4!==t))&&Z(e,e.output,e.next_out,c-e.avail_out)?(r.mode=31,-4):(f-=e.avail_in,c-=e.avail_out,e.total_in+=f,e.total_out+=c,r.total+=c,r.wrap&&c&&(e.adler=r.check=r.flags?B(r.check,i,c,e.next_out-c):O(r.check,i,c,e.next_out-c)),e.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==f&&0===c||4===t)&&x===N&&(x=-5),x)},r.inflateEnd=function(e){if(!e||!e.state)return U;var t=e.state;return t.window&&(t.window=null),e.state=null,N},r.inflateGetHeader=function(e,t){var r;return e&&e.state?0==(2&(r=e.state).wrap)?U:((r.head=t).done=!1,N):U},r.inflateSetDictionary=function(e,t){var r,n=t.length;return e&&e.state?0!==(r=e.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,t,n,0)!==r.check?-3:Z(e,t,n,n)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,r){"use strict";var D=e("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,r,n,i,s,a,o){var h,u,l,f,c,d,p,m,_,g=o.bits,b=0,v=0,y=0,w=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(b=0;b<=15;b++)O[b]=0;for(v=0;v<n;v++)O[t[r+v]]++;for(k=g,w=15;1<=w&&0===O[w];w--);if(w<k&&(k=w),0===w)return i[s++]=20971520,i[s++]=20971520,o.bits=1,0;for(y=1;y<w&&0===O[y];y++);for(k<y&&(k=y),b=z=1;b<=15;b++)if(z<<=1,(z-=O[b])<0)return-1;if(0<z&&(0===e||1!==w))return-1;for(B[1]=0,b=1;b<15;b++)B[b+1]=B[b]+O[b];for(v=0;v<n;v++)0!==t[r+v]&&(a[B[t[r+v]]++]=v);if(d=0===e?(A=R=a,19):1===e?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),b=y,c=s,S=v=E=0,l=-1,f=(C=1<<(x=k))-1,1===e&&852<C||2===e&&592<C)return 1;for(;;){for(p=b-S,_=a[v]<d?(m=0,a[v]):a[v]>d?(m=R[T+a[v]],A[I+a[v]]):(m=96,0),h=1<<b-S,y=u=1<<x;i[c+(E>>S)+(u-=h)]=p<<24|m<<16|_|0,0!==u;);for(h=1<<b-1;E&h;)h>>=1;if(0!==h?(E&=h-1,E+=h):E=0,v++,0==--O[b]){if(b===w)break;b=t[r+a[v]]}if(k<b&&(E&f)!==l){for(0===S&&(S=k),c+=y,z=1<<(x=b-S);x+S<w&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===e&&852<C||2===e&&592<C)return 1;i[l=E&f]=k<<24|x<<16|c-s|0}}return 0!==E&&(i[c+E]=b-S<<24|64<<16|0),o.bits=k,0}},{"../utils/common":41}],51:[function(e,t,r){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,t,r){"use strict";var i=e("../utils/common"),o=0,h=1;function n(e){for(var t=e.length;0<=--t;)e[t]=0}var s=0,a=29,u=256,l=u+1+a,f=30,c=19,_=2*l+1,g=15,d=16,p=7,m=256,b=16,v=17,y=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],k=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(l+2));n(z);var C=new Array(2*f);n(C);var E=new Array(512);n(E);var A=new Array(256);n(A);var I=new Array(a);n(I);var O,B,R,T=new Array(f);function D(e,t,r,n,i){this.static_tree=e,this.extra_bits=t,this.extra_base=r,this.elems=n,this.max_length=i,this.has_stree=e&&e.length}function F(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t}function N(e){return e<256?E[e]:E[256+(e>>>7)]}function U(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255}function P(e,t,r){e.bi_valid>d-r?(e.bi_buf|=t<<e.bi_valid&65535,U(e,e.bi_buf),e.bi_buf=t>>d-e.bi_valid,e.bi_valid+=r-d):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=r)}function L(e,t,r){P(e,r[2*t],r[2*t+1])}function j(e,t){for(var r=0;r|=1&e,e>>>=1,r<<=1,0<--t;);return r>>>1}function Z(e,t,r){var n,i,s=new Array(g+1),a=0;for(n=1;n<=g;n++)s[n]=a=a+r[n-1]<<1;for(i=0;i<=t;i++){var o=e[2*i+1];0!==o&&(e[2*i]=j(s[o]++,o))}}function W(e){var t;for(t=0;t<l;t++)e.dyn_ltree[2*t]=0;for(t=0;t<f;t++)e.dyn_dtree[2*t]=0;for(t=0;t<c;t++)e.bl_tree[2*t]=0;e.dyn_ltree[2*m]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0}function M(e){8<e.bi_valid?U(e,e.bi_buf):0<e.bi_valid&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0}function H(e,t,r,n){var i=2*t,s=2*r;return e[i]<e[s]||e[i]===e[s]&&n[t]<=n[r]}function G(e,t,r){for(var n=e.heap[r],i=r<<1;i<=e.heap_len&&(i<e.heap_len&&H(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!H(t,n,e.heap[i],e.depth));)e.heap[r]=e.heap[i],r=i,i<<=1;e.heap[r]=n}function K(e,t,r){var n,i,s,a,o=0;if(0!==e.last_lit)for(;n=e.pending_buf[e.d_buf+2*o]<<8|e.pending_buf[e.d_buf+2*o+1],i=e.pending_buf[e.l_buf+o],o++,0===n?L(e,i,t):(L(e,(s=A[i])+u+1,t),0!==(a=w[s])&&P(e,i-=I[s],a),L(e,s=N(--n),r),0!==(a=k[s])&&P(e,n-=T[s],a)),o<e.last_lit;);L(e,m,t)}function Y(e,t){var r,n,i,s=t.dyn_tree,a=t.stat_desc.static_tree,o=t.stat_desc.has_stree,h=t.stat_desc.elems,u=-1;for(e.heap_len=0,e.heap_max=_,r=0;r<h;r++)0!==s[2*r]?(e.heap[++e.heap_len]=u=r,e.depth[r]=0):s[2*r+1]=0;for(;e.heap_len<2;)s[2*(i=e.heap[++e.heap_len]=u<2?++u:0)]=1,e.depth[i]=0,e.opt_len--,o&&(e.static_len-=a[2*i+1]);for(t.max_code=u,r=e.heap_len>>1;1<=r;r--)G(e,s,r);for(i=h;r=e.heap[1],e.heap[1]=e.heap[e.heap_len--],G(e,s,1),n=e.heap[1],e.heap[--e.heap_max]=r,e.heap[--e.heap_max]=n,s[2*i]=s[2*r]+s[2*n],e.depth[i]=(e.depth[r]>=e.depth[n]?e.depth[r]:e.depth[n])+1,s[2*r+1]=s[2*n+1]=i,e.heap[1]=i++,G(e,s,1),2<=e.heap_len;);e.heap[--e.heap_max]=e.heap[1],function(e,t){var r,n,i,s,a,o,h=t.dyn_tree,u=t.max_code,l=t.stat_desc.static_tree,f=t.stat_desc.has_stree,c=t.stat_desc.extra_bits,d=t.stat_desc.extra_base,p=t.stat_desc.max_length,m=0;for(s=0;s<=g;s++)e.bl_count[s]=0;for(h[2*e.heap[e.heap_max]+1]=0,r=e.heap_max+1;r<_;r++)p<(s=h[2*h[2*(n=e.heap[r])+1]+1]+1)&&(s=p,m++),h[2*n+1]=s,u<n||(e.bl_count[s]++,a=0,d<=n&&(a=c[n-d]),o=h[2*n],e.opt_len+=o*(s+a),f&&(e.static_len+=o*(l[2*n+1]+a)));if(0!==m){do{for(s=p-1;0===e.bl_count[s];)s--;e.bl_count[s]--,e.bl_count[s+1]+=2,e.bl_count[p]--,m-=2}while(0<m);for(s=p;0!==s;s--)for(n=e.bl_count[s];0!==n;)u<(i=e.heap[--r])||(h[2*i+1]!==s&&(e.opt_len+=(s-h[2*i+1])*h[2*i],h[2*i+1]=s),n--)}}(e,t),Z(s,u,e.bl_count)}function X(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),t[2*(r+1)+1]=65535,n=0;n<=r;n++)i=a,a=t[2*(n+1)+1],++o<h&&i===a||(o<u?e.bl_tree[2*i]+=o:0!==i?(i!==s&&e.bl_tree[2*i]++,e.bl_tree[2*b]++):o<=10?e.bl_tree[2*v]++:e.bl_tree[2*y]++,s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4))}function V(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),n=0;n<=r;n++)if(i=a,a=t[2*(n+1)+1],!(++o<h&&i===a)){if(o<u)for(;L(e,i,e.bl_tree),0!=--o;);else 0!==i?(i!==s&&(L(e,i,e.bl_tree),o--),L(e,b,e.bl_tree),P(e,o-3,2)):o<=10?(L(e,v,e.bl_tree),P(e,o-3,3)):(L(e,y,e.bl_tree),P(e,o-11,7));s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4)}}n(T);var q=!1;function J(e,t,r,n){P(e,(s<<1)+(n?1:0),3),function(e,t,r,n){M(e),n&&(U(e,r),U(e,~r)),i.arraySet(e.pending_buf,e.window,t,r,e.pending),e.pending+=r}(e,t,r,!0)}r._tr_init=function(e){q||(function(){var e,t,r,n,i,s=new Array(g+1);for(n=r=0;n<a-1;n++)for(I[n]=r,e=0;e<1<<w[n];e++)A[r++]=n;for(A[r-1]=n,n=i=0;n<16;n++)for(T[n]=i,e=0;e<1<<k[n];e++)E[i++]=n;for(i>>=7;n<f;n++)for(T[n]=i<<7,e=0;e<1<<k[n]-7;e++)E[256+i++]=n;for(t=0;t<=g;t++)s[t]=0;for(e=0;e<=143;)z[2*e+1]=8,e++,s[8]++;for(;e<=255;)z[2*e+1]=9,e++,s[9]++;for(;e<=279;)z[2*e+1]=7,e++,s[7]++;for(;e<=287;)z[2*e+1]=8,e++,s[8]++;for(Z(z,l+1,s),e=0;e<f;e++)C[2*e+1]=5,C[2*e]=j(e,5);O=new D(z,w,u+1,l,g),B=new D(C,k,0,f,g),R=new D(new Array(0),x,0,c,p)}(),q=!0),e.l_desc=new F(e.dyn_ltree,O),e.d_desc=new F(e.dyn_dtree,B),e.bl_desc=new F(e.bl_tree,R),e.bi_buf=0,e.bi_valid=0,W(e)},r._tr_stored_block=J,r._tr_flush_block=function(e,t,r,n){var i,s,a=0;0<e.level?(2===e.strm.data_type&&(e.strm.data_type=function(e){var t,r=4093624447;for(t=0;t<=31;t++,r>>>=1)if(1&r&&0!==e.dyn_ltree[2*t])return o;if(0!==e.dyn_ltree[18]||0!==e.dyn_ltree[20]||0!==e.dyn_ltree[26])return h;for(t=32;t<u;t++)if(0!==e.dyn_ltree[2*t])return h;return o}(e)),Y(e,e.l_desc),Y(e,e.d_desc),a=function(e){var t;for(X(e,e.dyn_ltree,e.l_desc.max_code),X(e,e.dyn_dtree,e.d_desc.max_code),Y(e,e.bl_desc),t=c-1;3<=t&&0===e.bl_tree[2*S[t]+1];t--);return e.opt_len+=3*(t+1)+5+5+4,t}(e),i=e.opt_len+3+7>>>3,(s=e.static_len+3+7>>>3)<=i&&(i=s)):i=s=r+5,r+4<=i&&-1!==t?J(e,t,r,n):4===e.strategy||s===i?(P(e,2+(n?1:0),3),K(e,z,C)):(P(e,4+(n?1:0),3),function(e,t,r,n){var i;for(P(e,t-257,5),P(e,r-1,5),P(e,n-4,4),i=0;i<n;i++)P(e,e.bl_tree[2*S[i]+1],3);V(e,e.dyn_ltree,t-1),V(e,e.dyn_dtree,r-1)}(e,e.l_desc.max_code+1,e.d_desc.max_code+1,a+1),K(e,e.dyn_ltree,e.dyn_dtree)),W(e),n&&M(e)},r._tr_tally=function(e,t,r){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&r,e.last_lit++,0===t?e.dyn_ltree[2*r]++:(e.matches++,t--,e.dyn_ltree[2*(A[r]+u+1)]++,e.dyn_dtree[2*N(t)]++),e.last_lit===e.lit_bufsize-1},r._tr_align=function(e){P(e,2,3),L(e,m,z),function(e){16===e.bi_valid?(U(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):8<=e.bi_valid&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8)}(e)}},{"../utils/common":41}],53:[function(e,t,r){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,t,r){(function(e){!function(r,n){"use strict";if(!r.setImmediate){var i,s,t,a,o=1,h={},u=!1,l=r.document,e=Object.getPrototypeOf&&Object.getPrototypeOf(r);e=e&&e.setTimeout?e:r,i="[object process]"==={}.toString.call(r.process)?function(e){process.nextTick(function(){c(e)})}:function(){if(r.postMessage&&!r.importScripts){var e=!0,t=r.onmessage;return r.onmessage=function(){e=!1},r.postMessage("","*"),r.onmessage=t,e}}()?(a="setImmediate$"+Math.random()+"$",r.addEventListener?r.addEventListener("message",d,!1):r.attachEvent("onmessage",d),function(e){r.postMessage(a+e,"*")}):r.MessageChannel?((t=new MessageChannel).port1.onmessage=function(e){c(e.data)},function(e){t.port2.postMessage(e)}):l&&"onreadystatechange"in l.createElement("script")?(s=l.documentElement,function(e){var t=l.createElement("script");t.onreadystatechange=function(){c(e),t.onreadystatechange=null,s.removeChild(t),t=null},s.appendChild(t)}):function(e){setTimeout(c,0,e)},e.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];var n={callback:e,args:t};return h[o]=n,i(o),o++},e.clearImmediate=f}function f(e){delete h[e]}function c(e){if(u)setTimeout(c,0,e);else{var t=h[e];if(t){u=!0;try{!function(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r)}}(t)}finally{f(e),u=!1}}}}function d(e){e.source===r&&"string"==typeof e.data&&0===e.data.indexOf(a)&&c(+e.data.slice(a.length))}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[10])(10)};
let JSZipInstance = (typeof window !== 'undefined' && window.JSZip) ? window.JSZip : null;
if (!JSZipInstance) {
    try {
        JSZipInstance = bundledJsZipFactory();
        if (typeof window !== 'undefined' && !window.JSZip) {
            window.JSZip = JSZipInstance;
        }
    } catch (e) {
        console.error('[RBQ] Failed to initialize bundled JSZip:', e);
    }
}
// ===============================================================


const EXTENSION_NAME = 'st_scene_trigger';
const DISPLAY_NAME = 'RBQ生图扩展';
const SETTINGS_HTML_ID = 'st-scene-trigger-settings';
const LOCAL_VERSION = '0.3.93';
const REMOTE_MANIFEST_URL = 'https://raw.githubusercontent.com/TTWParty/SillyTavern-RBQ-Draw/main/manifest.json';

function getExtensionFolderName() {
    try {
        const url = new URL(import.meta.url);
        const parts = url.pathname.split('/').filter(Boolean);
        for (let i = parts.length - 1; i >= 0; i--) {
            if (parts[i].endsWith('.js') && i > 0) {
                return parts[i - 1];
            }
        }
    } catch (e) {
        console.warn('[RBQ] Failed to detect extension folder from import.meta.url:', e);
    }
    return 'SillyTavern-RBQ-Draw';
}

const DEFAULTS = {
    enabled: true,
    theme: 'dark',
    autoGenerate: false,
    renderMode: 'smart',
    currentMode: 'comfyui',
    targetRole: 'assistant',
    pollMs: 1500,
    inlineWidth: 100,
    startTag: 'image###',
    endTag: '###',
    prefix: '',
    suffix: '',
    negative: '',
    customRegex: '',
    grokAspectRatio: '1:1',
    grokResolution: '1k',
    schedulerUrl: 'http://127.0.0.1:8188',
    apiKey: '',
    model: '',
    sizePreset: 'square',
    width: 1024,
    height: 1024,
    steps: 20,
    cfg: 7,
    seed: -1,
    cacheRetentionDays: 7,
    comfyuiUrl: 'http://127.0.0.1:8188',
    comfyuiApiKey: '',
    comfyuiModel: '',
    comfyuiSizePreset: 'square',
    comfyuiWidth: 1024,
    comfyuiHeight: 1024,
    comfyuiSteps: 20,
    comfyuiCfg: 7,
    comfyuiSeed: -1,
    comfyuiSampler: 'euler',
    comfyuiScheduler: 'normal',
    comfyuiSelectedWorkflow: 'default_t2i',
    comfyuiWorkflowJson: '',
    comfyuiWorkflows: [],
    naiUrl: '',
    naiApiKey: '',
    naiModel: 'nai-diffusion-5-full',
    naiEndpointMode: 'official',
    naiRbqUrl: '',
    naiSizePreset: 'portrait',
    naiWidth: 832,
    naiHeight: 1216,
    naiSteps: 28,
    naiScale: 6,
    naiSeed: -1,
    naiSampler: 'k_euler_ancestral',
    naiNoiseSchedule: 'karras',
    naiCfgRescale: 0,
    naiVarietyPlus: true,
    naiUncondScale: 0,
    naiVibes: [],
    naiPreciseRefs: [],
    freeUrl: '',
    freeApiKey: '',
    freeModel: '',
    freeSizePreset: 'square',
    freeWidth: 1024,
    freeHeight: 1024,
    freeSteps: 20,
    freeCfg: 7,
    freeSeed: -1,
    showFloatingButton: true,
    singleGenerationOnly: false,
    floatingVisibilityMigrated: false,
    floatingButtonX: null,
    floatingButtonY: null,
    history: [],
    _plugins: {}, // { id: { version, code, enabled } }
};

const PLUGIN_MODES = new Map();

window.RBQ = {
    version: '1.1.0',
    hooks: {},
    _pluginCleaners: new Map(),
    on(event, cb) {
        if (!this.hooks[event]) this.hooks[event] = [];
        this.hooks[event].push(cb);
    },
    off(event, cb) {
        if (!this.hooks[event]) return;
        if (typeof cb === 'function') {
            this.hooks[event] = this.hooks[event].filter((fn) => fn !== cb);
        } else {
            delete this.hooks[event];
        }
    },
    emit(event, payload) {
        if (!this.hooks[event]) return payload;
        for (const cb of this.hooks[event]) {
            try {
                const result = cb(payload);
                if (result !== undefined) payload = result;
            } catch (e) {
                console.error(`[RBQ Plugin] hook error on ${event}:`, e);
            }
        }
        return payload;
    },
    registerCleanup(pluginId, cleanupFn) {
        if (!pluginId || typeof cleanupFn !== 'function') return;
        if (this._pluginCleaners.has(pluginId)) {
            try {
                this._pluginCleaners.get(pluginId)();
            } catch (e) {
                console.warn(`[RBQ Core] Previous cleanup for ${pluginId} failed:`, e);
            }
        }
        this._pluginCleaners.set(pluginId, cleanupFn);
    },
    cleanupPlugin(pluginId) {
        if (this._pluginCleaners.has(pluginId)) {
            try {
                this._pluginCleaners.get(pluginId)();
            } catch (e) {
                console.warn(`[RBQ Core] Cleanup for ${pluginId} failed:`, e);
            }
            this._pluginCleaners.delete(pluginId);
        }
    },
    ui: {
        panels: [],
        addSettingPanel(id, title, renderHtmlFn) {
            const panel = { id, title, renderHtmlFn };
            const existingIdx = this.panels.findIndex((p) => p.id === id);
            if (existingIdx >= 0) {
                this.panels[existingIdx] = panel;
            } else {
                this.panels.push(panel);
            }
            if (document.getElementById('st-scene-trigger-modal')) {
                injectSingleDynamicPanel(panel);
            }
        },
        removeSettingPanel(id) {
            this.panels = this.panels.filter((p) => p.id !== id);
            document.querySelector(`[data-kite-tab="${id}"]`)?.remove();
            document.querySelector(`[data-kite-panel="${id}"]`)?.remove();
        }
    },
    api: {
        getSettings: () => {
            return getSettings();
        },
        saveSettings: () => {
            if (typeof saveSettingsDebounced === 'function') saveSettingsDebounced();
        },
        saveChatDebounced: () => {
            if (typeof saveChatDebounced === 'function') saveChatDebounced();
            else if (typeof getContext()?.saveChatDebounced === 'function') getContext().saveChatDebounced();
        },
        saveChat: () => {
            if (typeof saveChat === 'function') saveChat();
            else if (typeof getContext()?.saveChat === 'function') getContext().saveChat();
        },
        setMessageExtra: (messageId, key, data) => {
            const id = Number(messageId);
            if (!Number.isFinite(id)) return false;
            const ctx = getContext?.();
            const message = ctx?.chat?.[id];
            if (!message) return false;
            if (!message.extra) message.extra = {};
            if (typeof key === 'string') {
                message.extra[key] = data;
            } else if (typeof key === 'object' && key !== null) {
                Object.assign(message.extra, key);
            }
            if (typeof saveChatDebounced === 'function') saveChatDebounced();
            else if (typeof ctx?.saveChatDebounced === 'function') ctx.saveChatDebounced();
            return true;
        },
        getMessageExtra: (messageId, key) => {
            const id = Number(messageId);
            if (!Number.isFinite(id)) return null;
            const ctx = getContext?.();
            const message = ctx?.chat?.[id];
            if (!message?.extra) return null;
            return key ? message.extra[key] : message.extra;
        },
        getNaiVibes: () => {
            return cloneCurrentNaiVibes();
        },
        setNaiVibes: (items, options = {}) => {
            const next = (Array.isArray(items) ? items : [])
                .map(sanitizeNaiVibe)
                .filter(Boolean)
                .slice(0, 6);
            naiPreciseRefs.splice(0, naiPreciseRefs.length);
            naiVibes.splice(0, naiVibes.length, ...next.map((item) => ({ ...item })));
            persistNaiAdvancedState(options.source || 'plugin');
            renderNaiAdvancedDecks();
            return cloneCurrentNaiVibes();
        },
        refreshNaiVibeUi: () => {
            renderNaiAdvancedDecks();
        },
        eventSource,
        event_types,
        isStreamingActive: () => isStreamingActive(),
        getContext: () => {
            return getContext();
        },
        getMessage: (messageId) => {
            const id = Number(messageId);
            if (!Number.isFinite(id)) return null;
            return getContext()?.chat?.[id] || null;
        },
        getRecentMessages: (messageId, count = 5) => {
            const id = Number(messageId);
            const limit = Math.max(1, Math.min(50, Number(count) || 5));
            const chat = getContext()?.chat || [];
            if (!Number.isFinite(id) || !Array.isArray(chat)) return [];
            const start = Math.max(0, id - limit + 1);
            return chat.slice(start, id + 1).map((message, index) => ({
                id: start + index,
                is_user: !!message?.is_user,
                name: message?.name || '',
                mes: String(message?.mes || ''),
            }));
        },
        getMessageElement: (messageId) => {
            const id = Number(messageId);
            if (!Number.isFinite(id)) return null;
            return document.querySelector(`.mes[mesid="${id}"]`);
        },
        getMessageTextContainer: (messageId) => {
            const id = Number(messageId);
            if (!Number.isFinite(id)) return null;
            const element = document.querySelector(`.mes[mesid="${id}"]`);
            return getMessageTextContainer(element);
        },
        createPromptCard: ({ messageId, prompt, raw = '', id = '', label = 'external' } = {}) => {
            const resolvedPrompt = String(prompt || '').trim();
            if (!resolvedPrompt) return null;
            const promptId = id || `${label}:${resolvedPrompt}`;
            return createInlineCardWrapper({
                id: promptId,
                label,
                prompt: resolvedPrompt,
                raw: String(raw || ''),
            }, Number(messageId));
        },
        extractPrompts: (text) => {
            return extractPrompts(text);
        },
        generateImage: (prompt, reason = 'plugin', meta = {}, onProgress = null) => {
            return generateImage(prompt, reason, meta, onProgress);
        },
        renderInlineGeneratedImage: (wrapper, result) => {
            return renderInlineGeneratedImage(wrapper, result);
        },
        ensureHistoryItemDisplayUrl: (item, options) => {
            return ensureHistoryItemDisplayUrl(item, options);
        },
        shouldAutoGenerate: () => {
            return !!getSettings().autoGenerate;
        },
        getImageCacheUsage: () => {
            return getImageCacheUsage();
        },
        clearImageCache: () => {
            return clearImageCache();
        },
        clearCacheOlderThanDays: (days) => {
            return clearCacheOlderThanDays(days);
        },
        exportChatImagesZip: () => {
            return exportChatImagesZip();
        },
        updateCacheUsageUi: () => {
            return updateCacheUsageUi();
        },
        updateViewerCurrentItem: (imageResult, updatedPrompt) => {
            return updateViewerCurrentItem(imageResult, updatedPrompt);
        },
        getViewerState: () => {
            return viewerState;
        },
        openImageViewer: (prompt, currentUrl, meta = {}) => {
            return openImageViewer(prompt, currentUrl, meta);
        },
        registerMode: (id, meta, generateFn) => {
            if (!id || !meta || typeof generateFn !== 'function') {
                console.error('[RBQ Core] registerMode failed: invalid arguments');
                return false;
            }
            PLUGIN_MODES.set(id, { meta, generateFn });
            console.info(`[RBQ Core] Registered custom mode: ${id}`);
            return true;
        },
        unregisterMode: (id) => {
            if (PLUGIN_MODES.has(id)) {
                PLUGIN_MODES.delete(id);
                console.info(`[RBQ Core] Unregistered custom mode: ${id}`);
                return true;
            }
            return false;
        },
        getGlobalProfiles: () => ensureGlobalProfiles(),
        getActiveGlobalProfile: () => getActiveGlobalProfile(),
        switchGlobalProfile: (id) => switchGlobalProfile(id),
        saveCurrentGlobalProfile: (notify) => saveCurrentGlobalProfile(notify),
        createNewGlobalProfile: (name) => createNewGlobalProfile(name),
        autoUpdatePlugins: () => autoUpdateInstalledPlugins(),
        getCachedImageRecord: (cacheId) => getCachedImageRecord(cacheId),
        saveImageBlobToCache: (item, blob) => saveImageBlobToCache(item, blob),
        getStRequestHeaders: (opts) => (typeof getStRequestHeaders === 'function' ? getStRequestHeaders(opts) : {}),
        getRequestHeaders: (opts) => (typeof getStRequestHeaders === 'function' ? getStRequestHeaders(opts) : {}),
    }
};

const BUILTIN_PATTERNS = [
    { label: 'img', regex: /\[img\]([\s\S]*?)\[\/img\]/gi },
    { label: 'scene', regex: /\[scene\]([\s\S]*?)\[\/scene\]/gi },
];

const IMAGE_CACHE_DB = 'st-scene-trigger-image-cache';
const IMAGE_CACHE_STORE = 'images';
const HISTORY_LIMIT = 300;
const HISTORY_PAGE_SIZE = 12;

let floatingOpen = false;
let modalOpen = false;
let floatingHiddenForSession = false;
let isDraggingFloating = false;
let suppressFloatingClick = false;
const pendingMessageIds = new Set();
const pendingForceIds = new Set(); // 记录哪些消息需要强制刷新
let processQueueTimer = null;       // 定时器 ID，可取消重排

// MutationObserver 侧滑守卫相关状态
let _rbqChatObserver = null;
let _rbqObserverTimer = null;
const _rbqObserverPending = new Set();

const autoKeys = new Set();
const viewerState = {
    open: false,
    prompt: '',
    items: [],
    index: 0,
    modalWasOpen: false,
};

const viewerZoomState = {
    scale: 1,
    x: 0,
    y: 0,
    isDragging: false,
    startX: 0,
    startY: 0,
    hasMoved: false,
    isPinching: false,
    pinchStartDist: 0,
    pinchStartScale: 1,
    isTouchPanning: false,
    lastTapTime: 0,
    isPullDismissing: false,
    pullDownY: 0,
};

function debugSwitchState() { }

function updateDebugOverlay() { }

/** 检测酒馆是否正在流式输出 */
function isStreamingActive() {
    const stopBtn = document.getElementById('stop_generating');
    const mesoWait = document.getElementById('mesozo_wait');

    const isHidden = (el) => {
        if (!el) return true;
        // 优先看 offsetParent，如果因为 fixed 布局为 null，再看内联样式和最终计算样式
        if (el.offsetParent !== null) return false;
        if (el.style.display === 'none') return true;
        return window.getComputedStyle(el).display === 'none';
    };

    const isStandardStreaming = stopBtn && !isHidden(stopBtn) && !stopBtn.disabled;
    const isMesozoicStreaming = mesoWait && !isHidden(mesoWait);

    return !!(isStandardStreaming || isMesozoicStreaming);
}
const naiCapabilityState = {
    encodeVibe: 'unknown',
    message: '填写 NAI 地址和 Token 后可检测',
};
let imageCacheDbPromise;
const objectUrlCache = new Map();
const thumbnailUrlCache = new Map();
const MAX_OBJECT_URL_CACHE = 40;
const MAX_THUMBNAIL_URL_CACHE = 80;

function setObjectUrlCache(cacheId, url) {
    if (!cacheId || !url) return;
    if (objectUrlCache.has(cacheId)) {
        const old = objectUrlCache.get(cacheId);
        if (old !== url && old && old.startsWith('blob:')) {
            try { URL.revokeObjectURL(old); } catch (_e) {}
        }
        objectUrlCache.delete(cacheId);
    } else if (objectUrlCache.size >= MAX_OBJECT_URL_CACHE) {
        const oldestKey = objectUrlCache.keys().next().value;
        if (oldestKey) {
            const oldestUrl = objectUrlCache.get(oldestKey);
            objectUrlCache.delete(oldestKey);
            if (oldestUrl && oldestUrl.startsWith('blob:')) {
                try { URL.revokeObjectURL(oldestUrl); } catch (_e) {}
            }
        }
    }
    objectUrlCache.set(cacheId, url);
}

function setThumbnailUrlCache(cacheId, url) {
    if (!cacheId || !url) return;
    if (thumbnailUrlCache.has(cacheId)) {
        const old = thumbnailUrlCache.get(cacheId);
        if (old !== url && old && old.startsWith('blob:')) {
            try { URL.revokeObjectURL(old); } catch (_e) {}
        }
        thumbnailUrlCache.delete(cacheId);
    } else if (thumbnailUrlCache.size >= MAX_THUMBNAIL_URL_CACHE) {
        const oldestKey = thumbnailUrlCache.keys().next().value;
        if (oldestKey) {
            const oldestUrl = thumbnailUrlCache.get(oldestKey);
            thumbnailUrlCache.delete(oldestKey);
            if (oldestUrl && oldestUrl.startsWith('blob:')) {
                try { URL.revokeObjectURL(oldestUrl); } catch (_e) {}
            }
        }
    }
    thumbnailUrlCache.set(cacheId, url);
}
let messageVisibilityObserver;
let inlineRestoreObserver;
let lastNaiCapabilityProbeKey = '';
const historyViewState = {
    page: 1,
    onlyCurrentChat: true,
    searchQuery: '',
    filterMode: 'all', // 'all' | 'favorite'
};
const naiVibes = [];
const naiPreciseRefs = [];
let _toggleNaiEndpointUi = null;

function sanitizeNaiVibe(item) {
    if (!item || typeof item !== 'object') return null;
    const b64 = String(item.b64 || '').trim();
    const tensor = String(item.tensor || '').trim();
    if (!b64 && !tensor) return null;
    return {
        id: String(item.id || Math.random().toString(36).slice(2, 9)),
        b64,
        tensor: tensor || null,
        info: Math.max(0, Math.min(1, Number(item.info) || 1)),
        strength: Math.max(0, Math.min(1, Number(item.strength) || 0.6)),
    };
}

function cloneCurrentNaiVibes() {
    return naiVibes
        .map((item) => sanitizeNaiVibe(item))
        .filter(Boolean)
        .map((item) => ({ ...item }));
}

function sanitizeNaiPreciseRef(item) {
    if (!item || typeof item !== 'object') return null;
    const b64 = String(item.b64 || '').trim();
    if (!b64) return null;
    const type = ['character', 'style', 'character&style'].includes(item.type) ? item.type : 'character';
    return {
        id: String(item.id || Math.random().toString(36).slice(2, 9)),
        b64,
        info: Math.max(0, Math.min(1, Number(item.info) || 1)),
        strength: Math.max(0, Math.min(1, Number(item.strength) || 1)),
        type,
    };
}

function hydrateNaiAdvancedStateFromSettings() {
    const settings = getSettings();
    naiVibes.splice(0, naiVibes.length, ...((Array.isArray(settings.naiVibes) ? settings.naiVibes : [])
        .map(sanitizeNaiVibe)
        .filter(Boolean)
        .slice(0, 6)));
    naiPreciseRefs.splice(0, naiPreciseRefs.length, ...((Array.isArray(settings.naiPreciseRefs) ? settings.naiPreciseRefs : [])
        .map(sanitizeNaiPreciseRef)
        .filter(Boolean)
        .slice(0, 6)));
}

function persistNaiAdvancedState() {
    const settings = getSettings();
    settings.naiVibes = naiVibes.map((item) => ({ ...item }));
    settings.naiPreciseRefs = naiPreciseRefs.map((item) => ({ ...item }));
    saveSettingsDebounced();
}

function getSettings() {
    extension_settings[EXTENSION_NAME] = extension_settings[EXTENSION_NAME] || {};
    const settings = extension_settings[EXTENSION_NAME];
    for (const [key, value] of Object.entries(DEFAULTS)) {
        if (!Object.hasOwn(settings, key)) {
            settings[key] = Array.isArray(value) ? [...value] : value;
        }
    }

    if (!Object.hasOwn(settings, 'cfg') && Object.hasOwn(settings, 'scale')) {
        settings.cfg = Number(settings.scale) || 7;
    }

    if (!Object.hasOwn(settings, 'comfyuiUrl')) settings.comfyuiUrl = settings.schedulerUrl || DEFAULTS.comfyuiUrl;
    if (!Object.hasOwn(settings, 'comfyuiApiKey')) settings.comfyuiApiKey = settings.apiKey || '';
    if (!Object.hasOwn(settings, 'comfyuiModel')) settings.comfyuiModel = settings.model || '';
    if (!Object.hasOwn(settings, 'comfyuiSizePreset')) settings.comfyuiSizePreset = settings.sizePreset || DEFAULTS.comfyuiSizePreset;
    if (!Object.hasOwn(settings, 'comfyuiWidth')) settings.comfyuiWidth = Number(settings.width) || DEFAULTS.comfyuiWidth;
    if (!Object.hasOwn(settings, 'comfyuiHeight')) settings.comfyuiHeight = Number(settings.height) || DEFAULTS.comfyuiHeight;
    if (!Object.hasOwn(settings, 'comfyuiSteps')) settings.comfyuiSteps = Number(settings.steps) || DEFAULTS.comfyuiSteps;
    if (!Object.hasOwn(settings, 'comfyuiCfg')) settings.comfyuiCfg = Number(settings.cfg) || DEFAULTS.comfyuiCfg;
    if (!Object.hasOwn(settings, 'comfyuiSeed')) settings.comfyuiSeed = Number(settings.seed ?? -1);

    if (!Object.hasOwn(settings, 'freeSeed')) settings.freeSeed = Number(settings.seed ?? -1);

    // 动态为插件注册的自定义配置提供默认值
    PLUGIN_MODES.forEach((pluginMode) => {
        if (pluginMode.meta?.settingsFields) {
            pluginMode.meta.settingsFields.forEach((field) => {
                if (!Object.hasOwn(settings, field.key) && field.default !== undefined) {
                    settings[field.key] = field.default;
                }
            });
        }
    });

    return settings;
}

/* ── 全局配置预设 (Global Configuration Profiles) ── */

const PROFILE_EXCLUDED_KEYS = new Set([
    '_globalProfiles',
    '_promptPresets',
    'promptPresetsConfig',
    'history',
    '_plugins',
    'floatingButtonX',
    'floatingButtonY',
    'floatingVisibilityMigrated',
    'naiVibes',
    'naiPreciseRefs',
    'comfyuiWorkflows',
    'comfyuiWorkflowJson',
]);

function sanitizeProfileData(raw) {
    if (!raw || typeof raw !== 'object') return {};
    const clean = {};
    for (const [k, v] of Object.entries(raw)) {
        if (k.startsWith('_') || k === 'i' || k === 't') continue;
        if (PROFILE_EXCLUDED_KEYS.has(k)) continue;
        if (v === undefined || v === null) continue;
        if (typeof v === 'string') {
            if (v.startsWith('data:image/') || v.length > 30000) continue;
            clean[k] = v;
        } else if (typeof v === 'number' || typeof v === 'boolean') {
            clean[k] = v;
        } else if (typeof v === 'object') {
            try {
                const s = JSON.stringify(v);
                if (s.length > 20000 || s.includes('data:image/')) continue;
                clean[k] = JSON.parse(s);
            } catch (_e) {}
        }
    }

    // 独立提取与净化提示词预设配置 (promptPresetsConfig)，防止载荷膨胀同时持久化全局提示词与激活预设
    // 关键修正：当传入 live settings 时必须优先读取 settings._promptPresets；
    // 仅当没有 _promptPresets 时（如从已有 profile.data 提取快照），才读取 raw.promptPresetsConfig
    const ppSource = (raw._promptPresets && typeof raw._promptPresets === 'object')
        ? raw._promptPresets
        : ((raw.promptPresetsConfig && typeof raw.promptPresetsConfig === 'object') ? raw.promptPresetsConfig : null);

    if (ppSource) {
        clean.promptPresetsConfig = {
            globalPositivePrefix: typeof ppSource.globalPositivePrefix === 'string' ? ppSource.globalPositivePrefix.slice(0, 10000) : '',
            globalPositiveSuffix: typeof ppSource.globalPositiveSuffix === 'string' ? ppSource.globalPositiveSuffix.slice(0, 10000) : '',
            globalNegative: typeof ppSource.globalNegative === 'string' ? ppSource.globalNegative.slice(0, 10000) : '',
            activeId: typeof ppSource.activeId === 'string' ? ppSource.activeId.slice(0, 100) : '',
            position: ppSource.position === 'append' ? 'append' : 'prepend',
        };
    } else if (raw.prefix || raw.suffix || raw.negative) {
        clean.promptPresetsConfig = {
            globalPositivePrefix: typeof raw.prefix === 'string' ? raw.prefix.slice(0, 10000) : '',
            globalPositiveSuffix: typeof raw.suffix === 'string' ? raw.suffix.slice(0, 10000) : '',
            globalNegative: typeof raw.negative === 'string' ? raw.negative.slice(0, 10000) : '',
            activeId: '',
            position: 'prepend',
        };
    }

    return clean;
}

function createProfileSnapshot(settings = getSettings()) {
    // 制作快照前，优先从 DOM 原生输入框提取最新的全局提示词与选中卡片，防止内存与 DOM 暂不同步
    const ppPosPreModal = document.getElementById('rbq-pp-global-pos-prefix');
    const ppPosSufModal = document.getElementById('rbq-pp-global-pos-suffix');
    const ppNegModal = document.getElementById('rbq-pp-global-negative');
    const ppSelectModal = document.getElementById('rbq-pp-select');
    const ppPosModal = document.getElementById('rbq-pp-position');
    if (ppPosPreModal || ppPosSufModal || ppNegModal || ppSelectModal || ppPosModal) {
        if (!settings._promptPresets || typeof settings._promptPresets !== 'object') {
            settings._promptPresets = { presets: [] };
        }
        if (ppPosPreModal && ppPosPreModal instanceof HTMLTextAreaElement) settings._promptPresets.globalPositivePrefix = ppPosPreModal.value;
        if (ppPosSufModal && ppPosSufModal instanceof HTMLTextAreaElement) settings._promptPresets.globalPositiveSuffix = ppPosSufModal.value;
        if (ppNegModal && ppNegModal instanceof HTMLTextAreaElement) settings._promptPresets.globalNegative = ppNegModal.value;
        if (ppSelectModal && ppSelectModal instanceof HTMLSelectElement) settings._promptPresets.activeId = ppSelectModal.value;
        if (ppPosModal && ppPosModal instanceof HTMLSelectElement) settings._promptPresets.position = ppPosModal.value;
    }
    if ('promptPresetsConfig' in settings) {
        delete settings.promptPresetsConfig;
    }
    return sanitizeProfileData(settings);
}

let _profilesSanitized = false;

function ensureGlobalProfiles() {
    const settings = getSettings();
    if (settings.i) {
        delete settings.i;
    }
    if (settings.t) {
        delete settings.t;
    }
    if (!settings._globalProfiles || typeof settings._globalProfiles !== 'object') {
        settings._globalProfiles = {
            activeProfileId: 'default',
            profiles: [],
        };
    }
    const gp = settings._globalProfiles;
    if (!Array.isArray(gp.profiles)) {
        gp.profiles = [];
    }

    // 仅在首次初始化加载时清洗历史污染的超大数据字段，防止报 413 / 设置无法保存
    // 杜绝每次调用时反复深度序列化阻塞主线程并触发 2.5s 重复保存
    let cleanedAny = false;
    if (!_profilesSanitized) {
        _profilesSanitized = true;
        gp.profiles.forEach((p) => {
            if (p && p.data && typeof p.data === 'object') {
                try {
                    p.data = sanitizeProfileData(p.data);
                } catch (_e) {
                    p.data = {};
                }
            }
        });
    }

    if (gp.profiles.length === 0) {
        gp.profiles.push({
            id: 'default',
            name: '默认配置',
            createdAt: Date.now(),
            updatedAt: Date.now(),
            data: createProfileSnapshot(settings),
        });
        gp.activeProfileId = 'default';
        cleanedAny = true;
    }
    if (!gp.profiles.some(p => p.id === gp.activeProfileId)) {
        gp.activeProfileId = gp.profiles[0].id;
        cleanedAny = true;
    }

    // 历史版本兼容性无感平滑升级：
    // 若当前活跃预设的 data 中尚未包含 promptPresetsConfig，但宿主存在 _promptPresets 配置，
    // 则自动为当前预设填充 promptPresetsConfig，确保老用户已有全局提示词不丢失
    const active = gp.profiles.find(p => p.id === gp.activeProfileId) || gp.profiles[0];
    if (active && active.data && !active.data.promptPresetsConfig && settings._promptPresets) {
        const pp = settings._promptPresets;
        active.data.promptPresetsConfig = {
            globalPositivePrefix: typeof pp.globalPositivePrefix === 'string' ? pp.globalPositivePrefix : '',
            globalPositiveSuffix: typeof pp.globalPositiveSuffix === 'string' ? pp.globalPositiveSuffix : '',
            globalNegative: typeof pp.globalNegative === 'string' ? pp.globalNegative : '',
            activeId: typeof pp.activeId === 'string' ? pp.activeId : '',
            position: pp.position === 'append' ? 'append' : 'prepend',
        };
        cleanedAny = true;
    }

    // 延时保存，绝对不阻塞酒馆主界面的启动渲染流程
    if (cleanedAny) {
        setTimeout(() => {
            try {
                if (typeof saveSettingsDebounced === 'function') saveSettingsDebounced();
            } catch (_e) {}
        }, 2500);
    }

    return gp;
}

function getActiveGlobalProfile() {
    const gp = ensureGlobalProfiles();
    return gp.profiles.find(p => p.id === gp.activeProfileId) || gp.profiles[0];
}

function repopulateGlobalProfileSelect() {
    const select = document.getElementById('st-scene-trigger-global-profile-select');
    if (!select || !(select instanceof HTMLSelectElement)) return;

    const gp = ensureGlobalProfiles();
    select.innerHTML = '';
    gp.profiles.forEach((p) => {
        const option = document.createElement('option');
        option.value = p.id;
        option.textContent = p.name;
        if (p.id === gp.activeProfileId) option.selected = true;
        select.appendChild(option);
    });
    select.value = gp.activeProfileId;
}

function saveCurrentGlobalProfile(notify = true) {
    const settings = getSettings();
    const gp = ensureGlobalProfiles();
    const active = getActiveGlobalProfile();
    if (!active) return;
    active.data = createProfileSnapshot(settings);
    active.updatedAt = Date.now();
    saveSettingsDebounced();
    if (notify) {
        toastr.success(`已保存当前配置预设「${active.name}」`, DISPLAY_NAME);
    }
}

function switchGlobalProfile(targetId) {
    const gp = ensureGlobalProfiles();
    if (gp.activeProfileId === targetId) return;

    const targetProfile = gp.profiles.find(p => p.id === targetId);
    if (!targetProfile) return;

    const settings = getSettings();

    // 0. 切出当前预设前，先保存当前界面的所有最新修改到当前活跃预设快照中
    try {
        saveFromModal();
        const curActive = gp.profiles.find(p => p.id === gp.activeProfileId);
        if (curActive) {
            curActive.data = createProfileSnapshot(settings);
            curActive.updatedAt = Date.now();
        }
    } catch (_e) {}

    // 1. 切换活动预设 ID
    gp.activeProfileId = targetProfile.id;

    // 2. 将非排除键重置至 DEFAULTS，再应用目标预设数据
    for (const [key, defVal] of Object.entries(DEFAULTS)) {
        if (PROFILE_EXCLUDED_KEYS.has(key)) continue;
        settings[key] = Array.isArray(defVal) ? [...defVal] : defVal;
    }
    const snapshot = sanitizeProfileData(targetProfile.data || {});
    for (const [key, value] of Object.entries(snapshot)) {
        if (PROFILE_EXCLUDED_KEYS.has(key)) continue;
        try {
            settings[key] = JSON.parse(JSON.stringify(value));
        } catch (_e) {
            settings[key] = value;
        }
    }

    // 3. 严格恢复目标预设记录的引擎模式（支持按预设名称智能自愈历史污染）
    if (snapshot.currentMode) {
        settings.currentMode = snapshot.currentMode;
    } else if (targetProfile.name && /nai|novelai/i.test(targetProfile.name)) {
        settings.currentMode = 'nai';
        targetProfile.data.currentMode = 'nai';
    }

    // 若预设名称明确指示为 NAI 但内部残留了初始 comfyui，自动纠正并持久化
    if (settings.currentMode === 'comfyui' && targetProfile.name && /nai|novelai/i.test(targetProfile.name)) {
        settings.currentMode = 'nai';
        targetProfile.data.currentMode = 'nai';
    }

    // 4. 应用提示词预设配置 (promptPresetsConfig) 到 settings._promptPresets
    const ppConfig = snapshot.promptPresetsConfig;
    if (!settings._promptPresets || typeof settings._promptPresets !== 'object') {
        settings._promptPresets = { presets: [] };
    }
    if (ppConfig && typeof ppConfig === 'object') {
        settings._promptPresets.globalPositivePrefix = ppConfig.globalPositivePrefix || '';
        settings._promptPresets.globalPositiveSuffix = ppConfig.globalPositiveSuffix || '';
        settings._promptPresets.globalNegative = ppConfig.globalNegative || '';
        settings._promptPresets.activeId = ppConfig.activeId || '';
        settings._promptPresets.position = ppConfig.position || 'prepend';
    } else {
        settings._promptPresets.globalPositivePrefix = snapshot.prefix || '';
        settings._promptPresets.globalPositiveSuffix = snapshot.suffix || '';
        settings._promptPresets.globalNegative = snapshot.negative || '';
        settings._promptPresets.activeId = '';
        settings._promptPresets.position = 'prepend';
    }

    // 5. 原地同步提示词预设插件的 DOM 界面（若面板已渲染）
    const ppPosPreEl = document.getElementById('rbq-pp-global-pos-prefix');
    const ppPosSufEl = document.getElementById('rbq-pp-global-pos-suffix');
    const ppNegEl = document.getElementById('rbq-pp-global-negative');
    const ppSelectEl = document.getElementById('rbq-pp-select');
    const ppPosEl = document.getElementById('rbq-pp-position');
    if (ppPosPreEl) ppPosPreEl.value = settings._promptPresets.globalPositivePrefix || '';
    if (ppPosSufEl) ppPosSufEl.value = settings._promptPresets.globalPositiveSuffix || '';
    if (ppNegEl) ppNegEl.value = settings._promptPresets.globalNegative || '';
    if (ppSelectEl) ppSelectEl.value = settings._promptPresets.activeId || '';
    if (ppPosEl) ppPosEl.value = settings._promptPresets.position || 'prepend';

    // 6. 即时同步引擎模式选择器的选中值（无需清空 options 重构，毫秒级响应）
    const modeSelect = document.getElementById('st-scene-trigger-current-mode');
    if (modeSelect instanceof HTMLSelectElement) {
        modeSelect.value = settings.currentMode || 'comfyui';
    }

    // 7. 统一刷新界面状态（syncUi 内部会调用 updateModeUi, updateModelDependentUi, _toggleNaiEndpointUi 等）
    syncUi();
    if (typeof _toggleNaiEndpointUi === 'function') {
        _toggleNaiEndpointUi();
    }
    syncComfyWorkflowEditor();

    // 8. 仅更新当前预设下拉框的选中项，严禁在 change 事件中清空重建 options 导致 macOS Aqua 菜单卡死
    const profileSelect = document.getElementById('st-scene-trigger-global-profile-select');
    if (profileSelect instanceof HTMLSelectElement && profileSelect.value !== targetProfile.id) {
        profileSelect.value = targetProfile.id;
    }

    saveSettingsDebounced();

    if (window.RBQ && typeof window.RBQ.emit === 'function') {
        window.RBQ.emit('profile:switched', { profileId: targetProfile.id, profile: targetProfile });
    }

    toastr.success(`已切换至配置预设「${targetProfile.name}」`, DISPLAY_NAME);
}

function createNewGlobalProfile(name) {
    const settings = getSettings();
    const gp = ensureGlobalProfiles();
    try {
        saveFromModal();
    } catch (_e) {}

    const newId = 'prof_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const newProfile = {
        id: newId,
        name: name.trim(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        data: createProfileSnapshot(settings),
    };
    gp.profiles.push(newProfile);
    gp.activeProfileId = newId;

    repopulateGlobalProfileSelect();
    saveSettingsDebounced();
    toastr.success(`已新建并切换至配置预设「${newProfile.name}」`, DISPLAY_NAME);
}

function renameGlobalProfile(profileId, newName) {
    const gp = ensureGlobalProfiles();
    const profile = gp.profiles.find(p => p.id === profileId);
    if (!profile) return;
    profile.name = newName.trim();
    profile.updatedAt = Date.now();
    repopulateGlobalProfileSelect();
    saveSettingsDebounced();
    toastr.success(`预设已重命名为「${profile.name}」`, DISPLAY_NAME);
}

function deleteGlobalProfile(profileId) {
    const gp = ensureGlobalProfiles();
    if (gp.profiles.length <= 1) {
        toastr.warning('至少需要保留一个全局配置预设，无法删除', DISPLAY_NAME);
        return;
    }
    const idx = gp.profiles.findIndex(p => p.id === profileId);
    if (idx === -1) return;
    const removedName = gp.profiles[idx].name;
    gp.profiles.splice(idx, 1);
    repopulateGlobalProfileSelect();

    if (gp.activeProfileId === profileId) {
        const nextTarget = gp.profiles[0];
        switchGlobalProfile(nextTarget.id);
    } else {
        saveSettingsDebounced();
    }
    toastr.success(`已删除配置预设「${removedName}」`, DISPLAY_NAME);
}

function downloadJsonFile(filename, dataObj) {
    const blob = new Blob([JSON.stringify(dataObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

function importGlobalProfiles(jsonObj, fileName = '导入预设') {
    if (!jsonObj || typeof jsonObj !== 'object') {
        throw new Error('无效的 JSON 配置文件');
    }
    const gp = ensureGlobalProfiles();

    // 格式 1: 单预设文件 (rbq_draw_global_profile 或包含 name + data)
    if (jsonObj.type === 'rbq_draw_global_profile' || (jsonObj.profile && jsonObj.profile.data) || (jsonObj.name && jsonObj.data)) {
        const pObj = jsonObj.profile || jsonObj;
        const defaultName = pObj.name || fileName.replace(/\.json$/i, '') || '导入预设';
        const input = window.prompt('请输入导入后的预设名称：', defaultName);
        if (input === null) return;
        const name = input.trim() || defaultName;

        const newId = 'prof_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
        const newProfile = {
            id: newId,
            name,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            data: sanitizeProfileData(pObj.data || {}),
        };
        gp.profiles.push(newProfile);
        switchGlobalProfile(newId);
        toastr.success(`已成功导入预设「${name}」并激活`, DISPLAY_NAME);
        return;
    }

    // 格式 2: 多预设备份包 (rbq_draw_global_profiles_bundle 或包含 profiles 数组)
    if (jsonObj.type === 'rbq_draw_global_profiles_bundle' || Array.isArray(jsonObj.profiles)) {
        const list = Array.isArray(jsonObj.profiles) ? jsonObj.profiles : [];
        if (list.length === 0) throw new Error('备份包中未发现任何有效预设');
        const ok = window.confirm(`检测到配置预设备份包，共包含 ${list.length} 个配置预设。\n点击“确定”将它们导入并追加到你的预设列表中。`);
        if (!ok) return;

        let lastId = null;
        list.forEach((p, index) => {
            if (!p || typeof p !== 'object') return;
            const newId = 'prof_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6) + '_' + index;
            const newProfile = {
                id: newId,
                name: String(p.name || `导入预设 ${index + 1}`),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                data: sanitizeProfileData(p.data || {}),
            };
            gp.profiles.push(newProfile);
            lastId = newId;
        });

        if (lastId) {
            switchGlobalProfile(lastId);
        } else {
            repopulateGlobalProfileSelect();
            saveSettingsDebounced();
        }
        toastr.success(`已批量导入 ${list.length} 个配置预设`, DISPLAY_NAME);
        return;
    }


    // 格式 3: 兼容直接导出的原始 extension_settings 完整对象
    if (jsonObj.currentMode || jsonObj.comfyuiUrl !== undefined || jsonObj.naiUrl !== undefined) {
        const defaultName = fileName.replace(/\.json$/i, '') || '导入的完整配置';
        const input = window.prompt('检测到完整扩展配置，请输入导入后的预设名称：', defaultName);
        if (input === null) return;
        const name = input.trim() || defaultName;

        const newId = 'prof_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
        const newProfile = {
            id: newId,
            name,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            data: createProfileSnapshot(jsonObj),
        };
        gp.profiles.push(newProfile);
        switchGlobalProfile(newId);
        toastr.success(`已成功导入预设「${name}」并激活`, DISPLAY_NAME);
        return;
    }

    throw new Error('未识别的预设文件格式');
}

function resolveEffectiveTheme(themeSetting = getSettings().theme) {
    if (themeSetting === 'light') return 'light';
    if (themeSetting === 'dark') return 'dark';
    const bodyClass = (typeof document !== 'undefined' && document.body && document.body.className) || '';
    const isStLight = bodyClass.includes('light-theme') ||
                      bodyClass.includes('theme-light') ||
                      (document.documentElement && document.documentElement.getAttribute('data-theme') === 'light');
    const isSystemLight = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    return (isStLight || isSystemLight) ? 'light' : 'dark';
}

function applyTheme(themeSetting = getSettings().theme) {
    const effective = resolveEffectiveTheme(themeSetting);

    // CRITICAL: Clean up legacy data-st-theme attributes from html and body so SillyTavern global UI text/icons are NEVER broken
    if (typeof document !== 'undefined') {
        if (document.documentElement) document.documentElement.removeAttribute('data-st-theme');
        if (document.body) document.body.removeAttribute('data-st-theme');
    }

    // Apply theme strictly to RBQ host components
    const hostTargets = [
        document.getElementById('st-scene-trigger-modal'),
        document.querySelector('.st-scene-trigger-modal-shell'),
        document.getElementById('st-scene-trigger-floating-menu'),
        document.getElementById('st-scene-trigger-floating-toggle'),
        document.querySelector('.st-scene-trigger-image-viewer'),
        document.getElementById('st-scene-trigger-settings'),
    ].filter(Boolean);

    hostTargets.forEach((el) => {
        if (effective === 'light') {
            el.setAttribute('data-st-theme', 'light');
        } else {
            el.removeAttribute('data-st-theme');
        }
    });

    const themeBtn = document.getElementById('st-scene-trigger-theme-toggle-btn');
    if (themeBtn) {
        themeBtn.innerHTML = effective === 'light'
            ? '<i class="fa-solid fa-moon"></i>'
            : '<i class="fa-solid fa-sun"></i>';
        themeBtn.title = effective === 'light' ? '切换为暗黑极简 (Linear)' : '切换为极简纯白 (Vercel)';
    }

    const themeSelect = document.getElementById('st-scene-trigger-modal-theme');
    if (themeSelect && themeSelect.value !== themeSetting) {
        themeSelect.value = themeSetting;
    }
}

if (typeof window !== 'undefined' && window.matchMedia) {
    try {
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
            if (getSettings().theme === 'auto') {
                applyTheme('auto');
            }
        });
    } catch (_) {}
}

function getModeMeta(mode) {
    const meta = {
        comfyui: {
            title: 'ComfyUI',
            subtitle: '\u672c\u5730\u5de5\u4f5c\u6d41 / \u8c03\u5ea6\u5668\u6a21\u5f0f',
            endpointLabel: '\u0043\u006f\u006d\u0066\u0079\u0055\u0049 \u5730\u5740',
            keyLabel: '\u8bbf\u95ee\u5bc6\u94a5\uff08\u53ef\u9009\uff09',
            modelLabel: '\u0043\u0068\u0065\u0063\u006b\u0070\u006f\u0069\u006e\u0074 \u6a21\u578b',
            accent: 'comfyui',
        },
        nai: {
            title: 'NAI',
            subtitle: '\u004e\u006f\u0076\u0065\u006c\u0041\u0049 \u8fdc\u7a0b\u751f\u56fe\u6a21\u5f0f',
            endpointLabel: '\u004e\u0041\u0049 \u63a5\u53e3\u5730\u5740',
            keyLabel: 'NAI Token',
            modelLabel: '\u004e\u0041\u0049 \u6a21\u578b',
            accent: 'nai',
        },
    };
    const pluginMode = PLUGIN_MODES.get(mode);
    if (pluginMode) {
        return {
            title: pluginMode.meta.title || mode,
            subtitle: pluginMode.meta.subtitle || '自定义插件生图模式',
            endpointLabel: pluginMode.meta.endpointLabel || '接口地址',
            keyLabel: pluginMode.meta.keyLabel || 'API Key',
            modelLabel: pluginMode.meta.modelLabel || '生图模型',
            accent: pluginMode.meta.accent || 'free',
        };
    }
    return meta[mode] || meta.comfyui;
}

function getModeConnectionSettings(mode = getSettings().currentMode) {
    const settings = getSettings();
    if (mode === 'comfyui') {
        return {
            url: String(settings.comfyuiUrl || '').trim(),
            apiKey: String(settings.comfyuiApiKey || '').trim(),
            model: String(settings.comfyuiModel || '').trim(),
        };
    }
    if (mode === 'nai') {
        return {
            url: String(settings.naiUrl || '').trim(),
            apiKey: String(settings.naiApiKey || '').trim(),
            model: String(settings.naiModel || '').trim(),
        };
    }
    // Plugin mode generic mapping - uses 'free' slots by default to avoid bloating settings schema
    if (PLUGIN_MODES.has(mode)) {
        return {
            url: String(settings[`${mode}Url`] || settings.freeUrl || '').trim(),
            apiKey: String(settings[`${mode}ApiKey`] || settings.freeApiKey || '').trim(),
            model: String(settings[`${mode}Model`] || settings.freeModel || '').trim(),
        };
    }
    return {
        url: '',
        apiKey: '',
        model: '',
    };
}

function getModeImageSettings(mode = getSettings().currentMode) {
    const settings = getSettings();
    if (mode === 'comfyui') {
        return {
            sizePreset: settings.comfyuiSizePreset || 'square',
            width: Number(settings.comfyuiWidth) || 1024,
            height: Number(settings.comfyuiHeight) || 1024,
            steps: Number(settings.comfyuiSteps) || 20,
            cfg: Number(settings.comfyuiCfg) || 7,
            seed: Number(settings.comfyuiSeed ?? -1),
        };
    }
    if (mode === 'nai') {
        return {
            sizePreset: settings.naiSizePreset || 'portrait',
            width: Number(settings.naiWidth) || 832,
            height: Number(settings.naiHeight) || 1216,
            steps: Number(settings.naiSteps) || 28,
            cfg: Number(settings.naiScale) || 6,
            seed: Number(settings.naiSeed ?? -1),
        };
    }
    const target = (mode === 'free' || PLUGIN_MODES.has(mode)) ? 'free' : mode;
    return {
        sizePreset: settings[`${target}SizePreset`] || 'square',
        width: Number(settings[`${target}Width`]) || 1024,
        height: Number(settings[`${target}Height`]) || 1024,
        steps: Number(settings[`${target}Steps`]) || 20,
        cfg: Number(settings[`${target}Cfg`]) || 7,
        seed: Number(settings[`${target}Seed`] ?? -1),
    };
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function formatHistoryTime(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('zh-CN', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}

function getConversationContext() {
    const context = getContext() || {};
    const chatId = String(getCurrentChatId?.() || '');
    const groupId = context.groupId != null ? String(context.groupId) : '';
    const characterId = context.characterId != null ? String(context.characterId) : '';
    const ownerType = groupId ? 'group' : 'character';
    const ownerId = groupId || characterId || 'unknown';
    return {
        chatId,
        groupId,
        characterId,
        ownerType,
        ownerId,
        conversationKey: `${ownerType}:${ownerId}:${chatId || 'no-chat'}`,
    };
}

function buildMessageHistoryScope(messageId, prompt = '') {
    const conversation = getConversationContext();
    return {
        ...conversation,
        messageId: Number.isFinite(Number(messageId)) ? Number(messageId) : null,
        prompt: String(prompt || '').trim(),
    };
}

function matchesHistoryScope(item, scope) {
    if (!item || !scope) return false;
    const itemPrompt = String(item.prompt || '').trim().toLowerCase();
    const scopePrompt = String(scope.prompt || '').trim().toLowerCase();
    if (scopePrompt && scopePrompt !== '[smart draw]') {
        if (!itemPrompt) return false;
        if (itemPrompt !== scopePrompt && !itemPrompt.includes(scopePrompt) && !scopePrompt.includes(itemPrompt)) {
            return false;
        }
    }
    if (scope.messageId != null && item.messageId != null && Number(item.messageId) !== Number(scope.messageId)) {
        return false;
    }
    if (scope.chatId && item.chatId && String(item.chatId) !== String(scope.chatId)) {
        return false;
    }
    if (scope.conversationKey && item.conversationKey && String(item.conversationKey) !== String(scope.conversationKey)) {
        return false;
    }
    return true;
}

function buildCacheId() {
    return `kite-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function openImageCacheDb() {
    if (imageCacheDbPromise) return imageCacheDbPromise;
    imageCacheDbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(IMAGE_CACHE_DB, 1);
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(IMAGE_CACHE_STORE)) {
                const store = db.createObjectStore(IMAGE_CACHE_STORE, { keyPath: 'id' });
                store.createIndex('createdAt', 'createdAt', { unique: false });
                store.createIndex('expiresAt', 'expiresAt', { unique: false });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => {
            imageCacheDbPromise = null;
            reject(request.error || new Error('打开图片缓存失败'));
        };
    }).catch((err) => {
        imageCacheDbPromise = null;
        throw err;
    });
    return imageCacheDbPromise;
}

async function withImageCacheStore(mode, callback) {
    const db = await openImageCacheDb();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(IMAGE_CACHE_STORE, mode);
        const store = transaction.objectStore(IMAGE_CACHE_STORE);
        const result = callback(store, transaction);
        transaction.oncomplete = () => resolve(result);
        transaction.onerror = () => reject(transaction.error || new Error('图片缓存读写失败'));
        transaction.onabort = () => reject(transaction.error || new Error('图片缓存事务被中止'));
    });
}

function waitRequest(request) {
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error || new Error('缓存请求失败'));
    });
}

async function saveImageBlobToCache(item, blob) {
    if (!(blob instanceof Blob) || !blob.size) return null;
    const settings = getSettings();
    const retentionDays = Math.max(1, Number(settings.cacheRetentionDays) || 7);
    const cacheId = item.cacheId || buildCacheId();
    const now = Date.now();
    const expiresAt = now + retentionDays * 24 * 60 * 60 * 1000;

    // 立即写入内存缓存与当前 item，确保同步界面响应与无缝渲染
    const inMemoryUrl = URL.createObjectURL(blob);
    setObjectUrlCache(cacheId, inMemoryUrl);
    item.displayUrl = inMemoryUrl;

    const thumbnailBlob = await createThumbnailBlob(blob);
    if (thumbnailBlob) {
        const thumbUrl = URL.createObjectURL(thumbnailBlob);
        setThumbnailUrlCache(cacheId, thumbUrl);
        item.thumbnailUrl = thumbUrl;
    }

    try {
        await withImageCacheStore('readwrite', (store) => {
            store.put({
                id: cacheId,
                blob,
                thumbnailBlob,
                createdAt: item.createdAt || now,
                updatedAt: now,
                expiresAt,
                prompt: String(item.prompt || ''),
                mode: String(item.mode || getSettings().currentMode || 'comfyui'),
                model: String(item.model || ''),
            });
        });
    } catch (e) {
        console.warn(`[${EXTENSION_NAME}] 保存图片到 IndexedDB 失败:`, e);
    }
    return cacheId;
}

async function getCachedImageRecord(cacheId) {
    if (!cacheId) return null;
    const db = await openImageCacheDb();
    const transaction = db.transaction(IMAGE_CACHE_STORE, 'readonly');
    const store = transaction.objectStore(IMAGE_CACHE_STORE);
    const record = await waitRequest(store.get(cacheId));
    return record || null;
}

async function deleteCachedImage(cacheId) {
    if (!cacheId) return;
    const objectUrl = objectUrlCache.get(cacheId);
    if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        objectUrlCache.delete(cacheId);
    }
    const thumbUrl = thumbnailUrlCache.get(cacheId);
    if (thumbUrl) {
        URL.revokeObjectURL(thumbUrl);
        thumbnailUrlCache.delete(cacheId);
    }
    await withImageCacheStore('readwrite', (store) => {
        store.delete(cacheId);
    });
}

async function pruneExpiredCache() {
    const settings = getSettings();
    const retentionDays = Math.max(1, Number(settings.cacheRetentionDays) || 7);
    const fallbackExpiresAt = Date.now() - retentionDays * 24 * 60 * 60 * 1000;
    const db = await openImageCacheDb();
    const transaction = db.transaction(IMAGE_CACHE_STORE, 'readwrite');
    const store = transaction.objectStore(IMAGE_CACHE_STORE);
    const request = store.openCursor();
    request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor) return;
        const value = cursor.value || {};
        const expiresAt = Number(value.expiresAt) || fallbackExpiresAt;
        if (expiresAt <= Date.now()) {
            const objectUrl = objectUrlCache.get(value.id);
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
                objectUrlCache.delete(value.id);
            }
            const thumbUrl = thumbnailUrlCache.get(value.id);
            if (thumbUrl) {
                URL.revokeObjectURL(thumbUrl);
                thumbnailUrlCache.delete(value.id);
            }
            cursor.delete();
        }
        cursor.continue();
    };
    await new Promise((resolve, reject) => {
        transaction.oncomplete = resolve;
        transaction.onerror = () => reject(transaction.error || new Error('清理缓存失败'));
        transaction.onabort = () => reject(transaction.error || new Error('清理缓存失败'));
    });
}

async function getImageCacheUsage() {
    const db = await openImageCacheDb();
    const transaction = db.transaction(IMAGE_CACHE_STORE, 'readonly');
    const store = transaction.objectStore(IMAGE_CACHE_STORE);
    const request = store.openCursor();
    let totalBytes = 0;
    let count = 0;
    request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor) return;
        const blob = cursor.value?.blob;
        const thumbBlob = cursor.value?.thumbnailBlob;
        totalBytes += blob instanceof Blob ? blob.size : 0;
        totalBytes += thumbBlob instanceof Blob ? thumbBlob.size : 0;
        count += 1;
        cursor.continue();
    };
    await new Promise((resolve, reject) => {
        transaction.oncomplete = resolve;
        transaction.onerror = () => reject(transaction.error || new Error('读取缓存占用失败'));
        transaction.onabort = () => reject(transaction.error || new Error('读取缓存占用失败'));
    });
    return { totalBytes, count };
}

function formatBytes(bytes) {
    const value = Number(bytes) || 0;
    if (value < 1024) return `${value} B`;
    if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
    if (value < 1024 * 1024 * 1024) return `${(value / (1024 * 1024)).toFixed(1)} MB`;
    return `${(value / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

async function updateCacheUsageUi() {
    const label = document.getElementById('st-scene-trigger-cache-usage');
    if (!(label instanceof HTMLElement)) return;
    try {
        const usage = await getImageCacheUsage();
        label.textContent = `${usage.count} 张 / ${formatBytes(usage.totalBytes)}`;
    } catch {
        label.textContent = '读取失败';
    }
}

async function clearImageCache() {
    objectUrlCache.forEach((url) => URL.revokeObjectURL(url));
    objectUrlCache.clear();
    thumbnailUrlCache.forEach((url) => URL.revokeObjectURL(url));
    thumbnailUrlCache.clear();
    const db = await openImageCacheDb();
    const transaction = db.transaction(IMAGE_CACHE_STORE, 'readwrite');
    const store = transaction.objectStore(IMAGE_CACHE_STORE);
    store.clear();
    await new Promise((resolve, reject) => {
        transaction.oncomplete = resolve;
        transaction.onerror = () => reject(transaction.error || new Error('清理缓存失败'));
        transaction.onabort = () => reject(transaction.error || new Error('清理缓存失败'));
    });
}

async function clearCacheOlderThanDays(days = 7) {
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    const db = await openImageCacheDb();
    const transaction = db.transaction(IMAGE_CACHE_STORE, 'readwrite');
    const store = transaction.objectStore(IMAGE_CACHE_STORE);
    const request = store.openCursor();
    let deletedCount = 0;
    request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor) return;
        const value = cursor.value || {};
        const createdAt = Number(value.createdAt) || 0;
        if (createdAt < cutoff) {
            const objectUrl = objectUrlCache.get(value.id);
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
                objectUrlCache.delete(value.id);
            }
            const thumbUrl = thumbnailUrlCache.get(value.id);
            if (thumbUrl) {
                URL.revokeObjectURL(thumbUrl);
                thumbnailUrlCache.delete(value.id);
            }
            cursor.delete();
            deletedCount++;
        }
        cursor.continue();
    };
    await new Promise((resolve, reject) => {
        transaction.oncomplete = resolve;
        transaction.onerror = () => reject(transaction.error || new Error('清理旧缓存失败'));
        transaction.onabort = () => reject(transaction.error || new Error('清理旧缓存失败'));
    });
    return deletedCount;
}

async function exportChatImagesZip() {
    const JSZipLib = await loadJsZipClass();
    if (!JSZipLib) {
        throw new Error('未找到 JSZip 库，请确保环境支持 ZIP 打包。');
    }
    const zip = new JSZipLib();
    const manifest = [];

    const db = await openImageCacheDb();
    const transaction = db.transaction(IMAGE_CACHE_STORE, 'readonly');
    const store = transaction.objectStore(IMAGE_CACHE_STORE);
    const request = store.openCursor();

    const records = [];
    await new Promise((resolve, reject) => {
        request.onsuccess = () => {
            const cursor = request.result;
            if (!cursor) {
                resolve();
                return;
            }
            records.push(cursor.value);
            cursor.continue();
        };
        request.onerror = () => reject(request.error || new Error('读取图片记录失败'));
    });

    let exportedCount = 0;
    for (let i = 0; i < records.length; i++) {
        const rec = records[i];
        if (rec?.blob instanceof Blob) {
            const dateStr = new Date(rec.createdAt || Date.now()).toISOString().slice(0, 19).replace(/[:T]/g, '-');
            const safePrompt = String(rec.prompt || 'image').slice(0, 30).replace(/[^a-zA-Z0-9_\u4e00-\u9fa5]/g, '_');
            const fileName = `${String(i + 1).padStart(3, '0')}_${dateStr}_${safePrompt}.png`;
            zip.file(fileName, rec.blob);
            manifest.push({
                index: i + 1,
                fileName,
                createdAt: rec.createdAt,
                prompt: rec.prompt,
                model: rec.model,
                mode: rec.mode,
            });
            exportedCount++;
        }
    }

    if (exportedCount === 0) {
        throw new Error('当前没有可导出的缓存图片。');
    }

    zip.file('manifest.json', JSON.stringify({ exportedAt: new Date().toISOString(), total: exportedCount, items: manifest }, null, 2));

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const downloadUrl = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `st-scene-trigger-images-${new Date().toISOString().slice(0, 10)}.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 10000);
    return exportedCount;
}

function pruneExpiredHistoryEntries() {
    const settings = getSettings();
    const retentionDays = Math.max(1, Number(settings.cacheRetentionDays) || 7);
    const cutoff = Date.now() - retentionDays * 24 * 60 * 60 * 1000;
    if (!Array.isArray(settings.history)) {
        settings.history = [];
        return;
    }
    const nextHistory = settings.history.filter((item) => {
        if (!item?.createdAt) return true;
        return Number(item.createdAt) >= cutoff;
    });
    if (nextHistory.length !== settings.history.length) {
        settings.history = nextHistory;
        saveSettingsDebounced();
    }
}

async function ensureHistoryItemDisplayUrl(item, options = {}) {
    if (!item) return '';

    // 1. 如果本会话中已经为该缓存 ID 生成了有效的 Blob URL，直接复用
    if (item.cacheId && objectUrlCache.has(item.cacheId)) {
        return objectUrlCache.get(item.cacheId);
    }

    // 2. 清理来自旧会话（刷新前）的已失效 blob: 链接
    // 仅在有 cacheId 且当前会话缓存池未命中时才判定为旧会话残留，尝试从 IndexedDB 重构；无 cacheId 时保留当前活跃 URL
    if (item.cacheId) {
        if (item.displayUrl && item.displayUrl.startsWith('blob:') && !objectUrlCache.has(item.cacheId)) {
            item.displayUrl = '';
        }
        if (item.url && item.url.startsWith('blob:') && !objectUrlCache.has(item.cacheId)) {
            item.url = '';
        }
    }

    // 3. 核心修复：如果存在 cacheId，优先从 IndexedDB 恢复图片（绕过可能过期的 server url）
    if (item.cacheId) {
        try {
            const cached = await getCachedImageRecord(item.cacheId);
            if (cached?.blob instanceof Blob) {
                let realBlob = cached.blob;
                const header = new Uint8Array(await realBlob.slice(0, 4).arrayBuffer());
                // 自愈机制：如果之前因动态加载失败把原始 ZIP 当成 PNG 存入，此处自动解压修复
                if (header[0] === 0x50 && header[1] === 0x4B) {
                    try {
                        const JSZipClass = await loadJsZipClass();
                        const zip = await JSZipClass.loadAsync(realBlob);
                        const file = Object.values(zip.files).find((entry) => !entry.dir && /\.(png|jpe?g|webp)$/i.test(entry.name))
                            || Object.values(zip.files).find((entry) => !entry.dir);
                        if (file) {
                            const uint8 = await file.async('uint8array');
                            const fileType = /\.jpe?g$/i.test(file.name) ? 'image/jpeg' : /\.webp$/i.test(file.name) ? 'image/webp' : 'image/png';
                            realBlob = new Blob([uint8], { type: fileType });
                            const thumbnailBlob = await createThumbnailBlob(realBlob);
                            cached.blob = realBlob;
                            cached.thumbnailBlob = thumbnailBlob;
                            await withImageCacheStore('readwrite', (store) => {
                                store.put(cached);
                            });
                            if (thumbnailBlob) {
                                const thumbUrl = URL.createObjectURL(thumbnailBlob);
                                setThumbnailUrlCache(item.cacheId, thumbUrl);
                                item.thumbnailUrl = thumbUrl;
                            }
                        }
                    } catch (unzipErr) {
                        console.warn(`[${EXTENSION_NAME}] 自动修复历史 ZIP 缓存失败 (${item.cacheId}):`, unzipErr);
                    }
                }

                const url = URL.createObjectURL(realBlob);
                setObjectUrlCache(item.cacheId, url);
                item.displayUrl = url;
                return url;
            }
        } catch (e) {
            console.warn(`[${EXTENSION_NAME}] 无法从 IndexedDB 恢复图片 (${item.cacheId}):`, e);
        }
    }

    // 3.5. 多端跨设备自愈：若当前对象缺少 serverUrl，但 settings.history 中已有同步记录，直接合并
    if (!item.serverUrl && !item.serverOriginalUrl && !item.serverPreviewUrl) {
        const history = Array.isArray(getSettings().history) ? getSettings().history : [];
        const normItemPrompt = String(item.prompt || '').trim().toLowerCase();
        const matched = history.find(h =>
            (item.cacheId && h.cacheId === item.cacheId) ||
            (normItemPrompt && h.prompt && (
                String(h.prompt).trim().toLowerCase() === normItemPrompt ||
                String(h.prompt).trim().toLowerCase().includes(normItemPrompt) ||
                normItemPrompt.includes(String(h.prompt).trim().toLowerCase())
            ))
        );
        if (matched) {
            if (matched.serverUrl) item.serverUrl = matched.serverUrl;
            if (matched.serverPreviewUrl) item.serverPreviewUrl = matched.serverPreviewUrl;
            if (matched.serverOriginalUrl) item.serverOriginalUrl = matched.serverOriginalUrl;
            if (!item.url && matched.url && !matched.url.startsWith('blob:')) item.url = matched.url;
        }
    }

    // 4. 服务端云端持久化链接优先兜底 (多端跨设备同步核心路径)
    // 双轨省流策略：默认一律优先选用轻量预览图（~60KB WebP），仅当显式要求原图或已在视口加载过原图时才选用无损原画
    let serverUrl = '';
    if (options?.preferOriginal || item._originalLoaded) {
        serverUrl = item.serverOriginalUrl || item.serverUrl || item.serverPreviewUrl;
    } else {
        serverUrl = item.serverPreviewUrl || (item.serverUrl && item.serverUrl.includes('_preview.webp') ? item.serverUrl : '') || item.serverUrl || item.serverOriginalUrl;
    }
    if (serverUrl) {
        item.displayUrl = serverUrl;
        // 自动自愈：在后台静默将服务端图片拉取并写入当前设备的 IndexedDB，使当前设备享有高速离线与秒开
        if (item.cacheId && typeof saveImageBlobToCache === 'function' && !item._isHydratingCache) {
            item._isHydratingCache = true;
            void (async () => {
                try {
                    const resp = await fetch(serverUrl);
                    if (resp.ok) {
                        const blob = await resp.blob();
                        await saveImageBlobToCache(item, blob);
                        console.info(`[${EXTENSION_NAME}] 已自动将服务端图片同步至当前设备本地缓存 (${item.cacheId})`);
                    }
                } catch (_) {} finally {
                    delete item._isHydratingCache;
                }
            })();
        }
        return serverUrl;
    }

    // 5. 最后回退到原始保存的 URL（可能是外部永久链接）
    return item.displayUrl || item.url || '';
}

async function ensureHistoryItemThumbnailUrl(item) {
    if (!item) return '';

    // 1. 如果本会话中已经为该缓存 ID 生成了有效的缩略图 Blob URL，直接复用
    if (item.cacheId && thumbnailUrlCache.has(item.cacheId)) {
        return thumbnailUrlCache.get(item.cacheId);
    }

    // 2. 清理旧会话失效 blob（仅当存在 cacheId 且未在当前内存池中时）
    if (item.cacheId) {
        if (item.thumbnailUrl && item.thumbnailUrl.startsWith('blob:') && !thumbnailUrlCache.has(item.cacheId)) {
            item.thumbnailUrl = '';
        }
    }

    // 3. 优先从缓存恢复高质量缩略图
    if (item.cacheId) {
        try {
            let cached = await getCachedImageRecord(item.cacheId);
            if (cached) {
                // 如果缓存 blob 是 ZIP，先调用 ensureHistoryItemDisplayUrl 触发自动解压自愈
                if (cached.blob instanceof Blob) {
                    const header = new Uint8Array(await cached.blob.slice(0, 2).arrayBuffer());
                    if (header[0] === 0x50 && header[1] === 0x4B) {
                        await ensureHistoryItemDisplayUrl(item);
                        cached = await getCachedImageRecord(item.cacheId);
                    }
                }

                const thumbBlob = cached?.thumbnailBlob instanceof Blob ? cached.thumbnailBlob : null;
                const fallbackBlob = cached?.blob instanceof Blob ? cached.blob : null;
                const sourceBlob = thumbBlob || fallbackBlob;

                if (sourceBlob) {
                    const url = URL.createObjectURL(sourceBlob);
                    thumbnailUrlCache.set(item.cacheId, url);
                    item.thumbnailUrl = url;
                    return url;
                }
            }
        } catch (e) {
            console.warn(`[${EXTENSION_NAME}] 无法从 IndexedDB 恢复缩略图 (${item.cacheId}):`, e);
        }
    }

    // 4. 服务端轻量预览图优先
    const serverThumb = item.serverPreviewUrl || item.serverUrl || item.serverOriginalUrl;
    if (serverThumb) {
        item.thumbnailUrl = serverThumb;
        return serverThumb;
    }

    // 5. 回退到 displayUrl (通常这也会触发 ensureHistoryItemDisplayUrl 的恢复逻辑)
    item.thumbnailUrl = await ensureHistoryItemDisplayUrl(item);
    return item.thumbnailUrl;
}

async function createThumbnailBlob(blob, maxSize = 320) {
    try {
        let bitmap;
        if (typeof createImageBitmap === 'function') {
            bitmap = await createImageBitmap(blob);
        } else {
            bitmap = await new Promise((resolve, reject) => {
                const image = new Image();
                const objectUrl = URL.createObjectURL(blob);
                image.onload = () => {
                    URL.revokeObjectURL(objectUrl);
                    resolve(image);
                };
                image.onerror = (error) => {
                    URL.revokeObjectURL(objectUrl);
                    reject(error);
                };
                image.src = objectUrl;
            });
        }
        const width = bitmap.width || bitmap.naturalWidth || 0;
        const height = bitmap.height || bitmap.naturalHeight || 0;
        if (!width || !height) return null;
        const scale = Math.min(1, maxSize / Math.max(width, height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(width * scale));
        canvas.height = Math.max(1, Math.round(height * scale));
        const context = canvas.getContext('2d');
        context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        if (bitmap.close instanceof Function) bitmap.close();
        return await new Promise((resolve) => canvas.toBlob((thumb) => resolve(thumb || null), 'image/jpeg', 0.82));
    } catch {
        return null;
    }
}

async function cacheImageFromSource(item, sourceUrl, headers = {}) {
    if (!sourceUrl) return item;
    try {
        const response = await fetch(sourceUrl, {
            cache: 'no-store',
            headers: headers,
        });
        if (!response.ok) throw new Error(`缓存图片失败 (${response.status})`);
        const blob = await response.blob();
        const cacheId = await saveImageBlobToCache(item, blob);
        if (cacheId) {
            item.cacheId = cacheId;
            saveSettingsDebounced();
            try {
                window.dispatchEvent(new CustomEvent('st-scene-trigger:image-cached', {
                    detail: { item, blob }
                }));
            } catch (_) {}
        }
    } catch (error) {
        console.warn(`[${EXTENSION_NAME}] image cache`, error);
    }
    return item;
}

function setStatus(text) {
    const value = String(text || '\u672a\u542f\u7528');
    const drawerStatus = document.getElementById('st-scene-trigger-status-text');
    const modalStatus = document.getElementById('st-scene-trigger-modal-status');
    if (drawerStatus) drawerStatus.textContent = `\u72b6\u6001: ${value}`;
    if (modalStatus) modalStatus.textContent = value;
}

function extractErrorString(errData, fallback = '') {
    if (!errData) return fallback;
    if (typeof errData === 'string') return errData;
    if (Array.isArray(errData.detail)) {
        return errData.detail
            .map((item) => {
                if (typeof item === 'string') return item;
                const loc = Array.isArray(item.loc) ? item.loc.filter((k) => k !== 'body').join('.') : '';
                const msg = item.msg || item.message || JSON.stringify(item);
                return loc ? `${loc}: ${msg}` : msg;
            })
            .filter(Boolean)
            .join('; ') || fallback;
    }
    if (typeof errData.detail === 'string') return errData.detail;
    if (errData.detail && typeof errData.detail === 'object') {
        return extractErrorString(errData.detail, fallback);
    }
    if (errData.error) {
        if (typeof errData.error === 'string') return errData.error;
        if (typeof errData.error === 'object') {
            return errData.error.message || errData.error.msg || JSON.stringify(errData.error);
        }
    }
    if (errData.message) {
        if (typeof errData.message === 'string') return errData.message;
        return JSON.stringify(errData.message);
    }
    if (errData.msg) return String(errData.msg);
    if (errData.error_description) return String(errData.error_description);
    return JSON.stringify(errData);
}

function translateError(error) {
    const settings = getSettings();
    const meta = getModeMeta(settings.currentMode);
    const modeTitle = meta.title || '服务器';
    const rawMsg = error instanceof Error ? error.message : (typeof error === 'object' ? extractErrorString(error) : String(error || ''));
    const msg = String(rawMsg || '');
    if (msg.includes('Failed to fetch')) {
        return `无法连接到 ${modeTitle}，请确认地址正确、服务器已启动并检查是否开启了跨域 (CORS) 限制。`;
    }
    if (msg.includes('NetworkError')) {
        return `连接到 ${modeTitle} 的网络异常。`;
    }
    if (msg.includes('HTTP 500')) {
        return '服务器内部错误 (500)，请查看 ComfyUI 的后台日志了解详情。';
    }
    if (msg.includes('timeout')) {
        return '请求超时，服务器长时间未响应。';
    }
    if (msg.includes('prompt_id')) {
        return '任务提交失败，生成服务未返回有效的任务 ID。';
    }
    return msg;
}

function updateNaiCapabilityUi() {
    const badge = document.getElementById('st-scene-trigger-nai-capability-badge');
    const text = document.getElementById('st-scene-trigger-nai-capability-text');
    if (badge instanceof HTMLElement) {
        badge.dataset.state = naiCapabilityState.encodeVibe;
        const labelMap = {
            supported: '可用',
            unsupported: '不可用',
            unknown: '未检测',
            checking: '检测中',
        };
        badge.textContent = `Encode-Vibe ${labelMap[naiCapabilityState.encodeVibe] || '未检测'}`;
    }
    if (text instanceof HTMLElement) {
        text.textContent = naiCapabilityState.message;
    }
}

function resolveNaiEndpoints(rawUrl) {
    const cleanUrl = String(rawUrl || '').trim().replace(/\/+$/, '');
    if (!cleanUrl) return { generate: '', encodeVibe: '', alternateGenerate: '' };

    try {
        const parsed = new URL(cleanUrl);
        const pathname = parsed.pathname.replace(/\/+$/, '');

        // 情况 1：纯域名或根路径（如 https://image.novelai.net、https://gnai.rbq.my）
        if (!pathname || pathname === '') {
            return {
                generate: `${cleanUrl}/ai/generate-image`,
                encodeVibe: `${cleanUrl}/ai/encode-vibe`,
                alternateGenerate: cleanUrl,
            };
        }

        // 情况 2：显式以标准 /ai/generate-image 结尾
        if (pathname.endsWith('/ai/generate-image')) {
            return {
                generate: cleanUrl,
                encodeVibe: cleanUrl.replace(/\/ai\/generate-image$/, '/ai/encode-vibe'),
                alternateGenerate: cleanUrl.replace(/\/ai\/generate-image$/, ''),
            };
        }

        // 情况 3：自定义非标完整路径（如 http://chami.yyqzx.com/image/chami）
        return {
            generate: cleanUrl,
            encodeVibe: `${cleanUrl}/ai/encode-vibe`,
            alternateGenerate: `${cleanUrl}/ai/generate-image`,
        };
    } catch (_e) {
        return {
            generate: cleanUrl.endsWith('/ai/generate-image') ? cleanUrl : `${cleanUrl}/ai/generate-image`,
            encodeVibe: cleanUrl.replace(/\/ai\/generate-image$/, '/ai/encode-vibe'),
            alternateGenerate: cleanUrl,
        };
    }
}

async function probeNaiEncodeCapability(force = false) {
    const connection = getModeConnectionSettings('nai');
    const base = String(connection.url || '').replace(/\/$/, '');
    const key = `${base}::${String(connection.apiKey || '').slice(0, 16)}`;
    if (!force && key && key === lastNaiCapabilityProbeKey && naiCapabilityState.encodeVibe !== 'unknown') {
        updateNaiCapabilityUi();
        return naiCapabilityState.encodeVibe;
    }

    if (!base) {
        naiCapabilityState.encodeVibe = 'unknown';
        naiCapabilityState.message = '填写 NAI 地址后可检测高级特征提取接口';
        updateNaiCapabilityUi();
        return 'unknown';
    }
    if (!connection.apiKey) {
        naiCapabilityState.encodeVibe = 'unknown';
        naiCapabilityState.message = '填写 NAI Token 后可检测 /encode-vibe 能力';
        updateNaiCapabilityUi();
        return 'unknown';
    }

    naiCapabilityState.encodeVibe = 'checking';
    naiCapabilityState.message = '正在检测 /ai/encode-vibe 是否可用...';
    updateNaiCapabilityUi();

    const endpoints = resolveNaiEndpoints(connection.url);
    const endpoint = endpoints.encodeVibe;

    try {
        const response = await fetch(endpoint, {
            method: 'OPTIONS',
            headers: {
                Authorization: `Bearer ${connection.apiKey}`,
            },
            signal: AbortSignal.timeout(2000),
        });
        if (response.status === 404) {
            naiCapabilityState.encodeVibe = 'unsupported';
            naiCapabilityState.message = '当前 NAI 后端未提供 /ai/encode-vibe，导入 .naiv4vibe 仍可正常使用。';
        } else {
            naiCapabilityState.encodeVibe = 'supported';
            naiCapabilityState.message = '已检测到 /ai/encode-vibe，可直接上传 Vibe 原图并自动提取特征。';
        }
    } catch {
        naiCapabilityState.encodeVibe = 'unknown';
        naiCapabilityState.message = '检测失败，可能是跨域、网络或后端拦截 OPTIONS；生成时仍会按实际接口结果重试。';
    }

    lastNaiCapabilityProbeKey = key;
    updateNaiCapabilityUi();
    return naiCapabilityState.encodeVibe;
}

function updateModeUi() {
    const settings = getSettings();
    const meta = getModeMeta(settings.currentMode);
    const map = {
        'st-scene-trigger-mode-name': meta.title,
        'st-scene-trigger-mode-name-sidebar': meta.title,
        'st-scene-trigger-mode-subtitle': meta.subtitle,
        'st-scene-trigger-mode-subtitle-sidebar': meta.subtitle,
        'st-scene-trigger-mode-tab-label': `${meta.title} \u914d\u7f6e`,
        'st-scene-trigger-mode-config-title': `${meta.title} \u53c2\u6570\u914d\u7f6e`,
        'st-scene-trigger-mode-config-subtitle': `\u8fd9\u91cc\u586b\u5199 ${meta.title} \u4e13\u5c5e\u7684\u8fde\u63a5\u4e0e\u6a21\u578b\u53c2\u6570`,
        'st-scene-trigger-endpoint-label': meta.endpointLabel,
        'st-scene-trigger-key-label': meta.keyLabel,
        'st-scene-trigger-model-field-label': meta.modelLabel,
    };

    Object.entries(map).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });

    const shell = document.querySelector('.st-scene-trigger-modal-shell');
    if (shell instanceof HTMLElement) {
        shell.dataset.modeAccent = meta.accent;
    }

    const keyField = document.getElementById('st-scene-trigger-key-field');
    if (keyField) {
        keyField.style.display = settings.currentMode === 'comfyui' ? 'none' : '';
    }

    // URL field: hide for NAI official/rbq, show for NAI custom & other modes
    const urlField = document.getElementById('st-scene-trigger-url-field');
    const urlInput = document.getElementById('st-scene-trigger-modal-scheduler-url');
    if (urlField) {
        if (settings.currentMode === 'nai') {
            const epMode = document.getElementById('st-scene-trigger-nai-endpoint-mode')?.value || 'official';
            urlField.style.display = epMode === 'custom' ? '' : 'none';
            if (urlInput) {
                urlInput.placeholder = '支持域名或完整接口 (如 /image/chami)';
            }
        } else {
            urlField.style.display = '';
            // Set appropriate placeholder per mode
            if (urlInput) {
                if (settings.currentMode === 'comfyui') {
                    urlInput.placeholder = 'http://127.0.0.1:8188';
                } else {
                    urlInput.placeholder = 'API 地址';
                }
            }
        }
    }

    const connection = getModeConnectionSettings(settings.currentMode);
    const isPluginMode = PLUGIN_MODES.has(settings.currentMode);

    const comfyOnly = document.querySelectorAll('[data-comfy-only="true"]');
    comfyOnly.forEach((element) => {
        if (element instanceof HTMLElement) {
            // Find inner input or select to accurately identify parameter ID
            const inner = element.querySelector('input, select, textarea');
            const targetId = inner ? inner.id : element.id;

            // General parameters (size, steps, cfg, seed) are now shared with plugins
            const isGeneralParam = targetId?.includes('width') ||
                targetId?.includes('height') ||
                targetId?.includes('steps') ||
                targetId?.includes('cfg') ||
                targetId?.includes('seed') ||
                targetId?.includes('size-preset');

            if (isPluginMode && isGeneralParam) {
                const pluginMode = PLUGIN_MODES.get(settings.currentMode);
                const hasCustomFields = !!pluginMode?.meta?.settingsFields?.length;
                if (hasCustomFields) {
                    element.classList.add('st-scene-trigger-mode-hidden');
                } else {
                    element.classList.remove('st-scene-trigger-mode-hidden');
                }
            } else {
                element.classList.toggle('st-scene-trigger-mode-hidden', settings.currentMode !== 'comfyui');
            }
        }
    });

    // 动态生成自定义插件配置表单项
    const container = document.getElementById('st-scene-trigger-plugin-fields-container');
    if (container) {
        container.innerHTML = '';
        const pluginMode = PLUGIN_MODES.get(settings.currentMode);
        if (pluginMode?.meta?.settingsFields) {
            pluginMode.meta.settingsFields.forEach((field) => {
                const label = document.createElement('label');
                label.className = 'st-scene-trigger-field';
                
                const span = document.createElement('span');
                span.textContent = field.label;
                label.appendChild(span);

                if (field.type === 'select') {
                    const select = document.createElement('select');
                    select.id = field.id;
                    if (field.options) {
                        field.options.forEach((opt) => {
                            const option = document.createElement('option');
                            option.value = opt.value;
                            option.textContent = opt.text;
                            select.appendChild(option);
                        });
                    }
                    label.appendChild(select);
                } else if (field.type === 'number') {
                    const input = document.createElement('input');
                    input.id = field.id;
                    input.type = 'number';
                    if (field.min !== undefined) input.min = String(field.min);
                    if (field.max !== undefined) input.max = String(field.max);
                    if (field.step !== undefined) input.step = String(field.step);
                    label.appendChild(input);
                } else if (field.type === 'checkbox') {
                    label.className = 'st-scene-trigger-field switch';
                    label.setAttribute('data-setting-key', field.key);
                    
                    const input = document.createElement('input');
                    input.id = field.id;
                    input.type = 'checkbox';
                    
                    const slider = document.createElement('span');
                    slider.className = 'slider round';
                    
                    label.appendChild(input);
                    label.appendChild(slider);
                } else {
                    const input = document.createElement('input');
                    input.id = field.id;
                    input.type = 'text';
                    if (field.placeholder) input.placeholder = field.placeholder;
                    label.appendChild(input);
                }

                // 初始化当前保存的值
                const savedVal = settings[field.key] !== undefined ? settings[field.key] : (field.default !== undefined ? field.default : '');
                const inputEl = label.querySelector('input, select, textarea');
                if (inputEl) {
                    if (inputEl instanceof HTMLInputElement && inputEl.type === 'checkbox') {
                        inputEl.checked = !!savedVal;
                    } else {
                        inputEl.value = String(savedVal);
                    }
                }

                container.appendChild(label);
            });
        }
    }

    const naiOnly = document.querySelectorAll('[data-nai-only="true"]');
    naiOnly.forEach((element) => {
        if (element instanceof HTMLElement) {
            element.classList.toggle('st-scene-trigger-mode-hidden', settings.currentMode !== 'nai');
        }
    });

    const freeOnly = document.querySelectorAll('[data-free-only="true"]');
    freeOnly.forEach((element) => {
        if (element instanceof HTMLElement) {
            element.classList.toggle('st-scene-trigger-mode-hidden', settings.currentMode !== 'free' && !isPluginMode);
        }
    });

    const refreshButton = document.getElementById('st-scene-trigger-comfy-refresh-capabilities');
    if (refreshButton instanceof HTMLElement) {
        refreshButton.style.display = (settings.currentMode === 'nai' || isPluginMode) ? 'none' : '';
    }

    const pollField = document.getElementById('st-scene-trigger-modal-poll-ms')?.closest('.st-scene-trigger-field');
    if (pollField instanceof HTMLElement) {
        pollField.style.display = (settings.currentMode === 'nai' || isPluginMode) ? 'none' : '';
    }

    const modelSelect = document.getElementById('st-scene-trigger-modal-model');
    if (modelSelect instanceof HTMLSelectElement && settings.currentMode === 'nai') {
        modelSelect.innerHTML = '';
        const currentVal = connection.model;
        NAI_MODELS.forEach((model) => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.append(option);
        });
        modelSelect.value = NAI_MODELS.includes(currentVal) ? currentVal : NAI_MODELS[0];
        updateModelDependentUi();
    }

    if (settings.currentMode === 'nai') {
        void probeNaiEncodeCapability();
    } else {
        updateNaiCapabilityUi();
    }
}

function applySizePreset(preset, mode = getSettings().currentMode) {
    const map = {
        square: { width: 1024, height: 1024 },
        portrait: mode === 'nai' ? { width: 832, height: 1216 } : { width: 832, height: 1216 },
        landscape: mode === 'nai' ? { width: 1216, height: 832 } : { width: 1216, height: 832 },
    };
    const next = map[preset];
    if (!next) return;

    const prefix = mode === 'comfyui' ? 'st-scene-trigger-comfy' : mode === 'nai' ? 'st-scene-trigger-nai' : 'st-scene-trigger-free';
    const widthInput = document.getElementById(`${prefix}-width`);
    const heightInput = document.getElementById(`${prefix}-height`);
    if (widthInput instanceof HTMLInputElement) widthInput.value = String(next.width);
    if (heightInput instanceof HTMLInputElement) heightInput.value = String(next.height);
}

function setupModeConfigTab() {
    const sidebar = document.querySelector('.st-scene-trigger-modal-sidebar');
    const generalButton = document.querySelector('[data-kite-tab="general"]');
    const generalPanel = document.querySelector('[data-kite-panel="general"]');
    if (!(sidebar instanceof HTMLElement) || !(generalButton instanceof HTMLElement) || !(generalPanel instanceof HTMLElement)) {
        return;
    }

    if (!document.querySelector('[data-kite-tab="mode"]')) {
        const button = document.createElement('button');
        button.className = 'st-scene-trigger-tab-button';
        button.dataset.kiteTab = 'mode';
        button.innerHTML = '<i class="fa-solid fa-plug-circle-bolt"></i><span id="st-scene-trigger-mode-tab-label">ComfyUI 配置</span>';
        generalButton.insertAdjacentElement('afterend', button);
        button.addEventListener('click', () => switchTab('mode'));
    }

    if (document.querySelector('[data-kite-panel="mode"]')) return;

    const subpanel = generalPanel.querySelector('.st-scene-trigger-subpanel');
    const actions = generalPanel.querySelector('.st-scene-trigger-modal-actions');
    const section = document.createElement('section');
    section.className = 'st-scene-trigger-modal-panel';
    section.dataset.kitePanel = 'mode';
    section.innerHTML = '<div class="st-scene-trigger-panel-title"><i class="fa-solid fa-plug-circle-bolt"></i><span>当前模式配置</span></div>';

    if (subpanel) {
        section.append(subpanel);
    }
    if (actions) {
        section.append(actions);
    }

    generalPanel.insertAdjacentElement('afterend', section);
}

function injectSingleDynamicPanel(panel) {
    const rail = document.querySelector('.st-scene-trigger-tab-rail');
    const content = document.querySelector('.st-scene-trigger-modal-content');
    if (!rail || !content) return;

    if (document.querySelector(`[data-kite-tab="${panel.id}"]`)) return;

    const button = document.createElement('button');
    button.className = 'st-scene-trigger-tab-button';
    button.dataset.kiteTab = panel.id;
    button.type = 'button';
    button.innerHTML = panel.title;
    button.addEventListener('click', () => switchTab(panel.id));

    const historyButton = rail.querySelector('[data-kite-tab="history"]');
    if (historyButton) {
        rail.insertBefore(button, historyButton);
    } else {
        rail.append(button);
    }

    const section = document.createElement('section');
    section.className = 'st-scene-trigger-modal-panel';
    section.dataset.kitePanel = panel.id;
    
    try {
        const elementOrHtml = typeof panel.renderHtmlFn === 'function' ? panel.renderHtmlFn() : '';
        if (elementOrHtml instanceof HTMLElement) {
            section.appendChild(elementOrHtml);
        } else {
            section.innerHTML = elementOrHtml;
        }
    } catch (panelErr) {
        console.error(`[${EXTENSION_NAME}] Failed to render plugin panel "${panel.id}":`, panelErr);
        section.innerHTML = `<div style="padding:20px;color:#f87171">插件面板 [${panel.id}] 渲染异常: ${panelErr?.message || panelErr}</div>`;
    }

    content.append(section);

    const event = new CustomEvent('rbq-panel-injected', { detail: { id: panel.id, panelEl: section } });
    document.dispatchEvent(event);
}

function setupDynamicPanels() {
    window.RBQ.ui.panels.forEach(injectSingleDynamicPanel);
}

function buildPatterns() {
    const settings = getSettings();
    const patterns = [...BUILTIN_PATTERNS];

    if (settings.startTag && settings.endTag) {
        const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        patterns.unshift({
            label: 'tag',
            regex: new RegExp(`${escapeRegex(settings.startTag)}([\\s\\S]*?)${escapeRegex(settings.endTag)}`, 'gi'),
        });
    }

    if (settings.customRegex) {
        try {
            patterns.push({ label: 'custom', regex: new RegExp(settings.customRegex, 'gi') });
        } catch {
            setStatus('\u81ea\u5b9a\u4e49\u6b63\u5219\u65e0\u6548');
        }
    }

    return patterns;
}

function extractPrompts(text) {
    const prompts = [];
    const seen = new Set();
    for (const pattern of buildPatterns()) {
        for (const match of String(text || '').matchAll(pattern.regex)) {
            const raw = String(match[0] || '');
            const prompt = String(match[1] || '').replace(/\s+/g, ' ').trim();
            const key = `${pattern.label}:${prompt}`;
            if (prompt && !seen.has(key)) {
                seen.add(key);
                prompts.push({ id: `${pattern.label}:${prompt}`, label: pattern.label, prompt, raw });
            }
        }
    }
    return prompts;
}

function shouldHandleMessage(message) {
    const settings = getSettings();
    if (!settings.enabled || !message) return false;
    if (settings.targetRole === 'assistant') return !message.is_user;
    if (settings.targetRole === 'user') return !!message.is_user;
    return true;
}

async function fetchJson(url, options = {}) {
    const fetchOptions = { ...options };
    if (!fetchOptions.signal) {
        fetchOptions.signal = AbortSignal.timeout(10000);
    }
    const response = await fetch(url, fetchOptions);
    const text = await response.text();
    let data = {};
    try {
        data = JSON.parse(text || "{}");
    } catch {
        data = {};
    }

    if (!response.ok) {
        let errorMsg = "";
        if (data.node_errors && typeof data.node_errors === 'object') {
            const errorDetails = Object.entries(data.node_errors).map(([nodeId, info]) => {
                const errList = Array.isArray(info?.errors) ? info.errors.map(e => e.message || e.details || JSON.stringify(e)).join('; ') : '';
                const cType = info?.class_type ? ` (${info.class_type})` : '';
                return `节点 [${nodeId}]${cType}: ${errList}`;
            }).join(' | ');
            if (errorDetails) {
                errorMsg = `工作流校验失败: ${errorDetails}`;
            }
        }
        if (!errorMsg) {
            errorMsg = data.error || data.detail || data.message || "";
            if (typeof errorMsg === "object") {
                errorMsg = errorMsg.message || errorMsg.details || JSON.stringify(errorMsg);
            }
        }

        if (response.status === 401 && String(errorMsg).includes("Access Token is missing or invalid")) {
            errorMsg = "无效的 API Key 或凭证已过期";
        } else if (response.status === 401 && !errorMsg) {
            errorMsg = "API Key 凭证无效或被拒绝访问";
        }

        throw new Error(errorMsg || text || `请求失败 (${response.status})`);
    }
    return data;
}

function getRequestHeaders() {
    const settings = getSettings();
    const mode = settings.currentMode;
    const connection = getModeConnectionSettings(mode);
    const headers = { 'Content-Type': 'application/json' };
    if (connection.apiKey) {
        headers['Authorization'] = `Bearer ${connection.apiKey}`;
    }
    return headers;
}

function buildGeneratePayload(finalPrompt) {
    const settings = getSettings();
    const mode = settings.currentMode;
    const connection = getModeConnectionSettings(mode);
    const image = getModeImageSettings(mode);
    const payload = {
        api_key: connection.apiKey,
        positive_prompt: finalPrompt,
        negative_prompt: settings.negative,
        model: connection.model,
        width: image.width,
        height: image.height,
        steps: image.steps,
        cfg: image.cfg,
        scale: image.cfg,
        seed: image.seed,
        size_preset: image.sizePreset,
        client_id: `rbq-${Date.now()}`,
        mode,
    };
    return window.RBQ.emit('buildGeneratePayload', payload);
}

function extractPngComfyPrompt(arrayBuffer) {
    try {
        const view = new DataView(arrayBuffer);
        if (view.byteLength < 8 || view.getUint32(0) !== 0x89504E47 || view.getUint32(4) !== 0x0D0A1A0A) {
            return null;
        }
        let offset = 8;
        const metadata = {};
        while (offset + 8 <= view.byteLength) {
            const length = view.getUint32(offset);
            const type = String.fromCharCode(
                view.getUint8(offset + 4),
                view.getUint8(offset + 5),
                view.getUint8(offset + 6),
                view.getUint8(offset + 7)
            );
            if (offset + 8 + length > view.byteLength) break;
            if (type === 'tEXt' || type === 'iTXt') {
                const chunkData = new Uint8Array(arrayBuffer, offset + 8, length);
                const text = new TextDecoder('utf-8', { fatal: false }).decode(chunkData);
                const nullIdx = text.indexOf('\0');
                if (nullIdx !== -1) {
                    const key = text.slice(0, nullIdx);
                    let value = text.slice(nullIdx + 1);
                    if (type === 'iTXt') {
                        const jsonStart = text.indexOf('{');
                        if (jsonStart !== -1) value = text.slice(jsonStart);
                    }
                    metadata[key] = value;
                }
            }
            offset += 12 + length;
        }
        if (metadata.prompt) return metadata.prompt;
        if (metadata.workflow) {
            try {
                const wf = JSON.parse(metadata.workflow);
                if (wf.extra?.prompt) return typeof wf.extra.prompt === 'string' ? wf.extra.prompt : JSON.stringify(wf.extra.prompt);
            } catch (_e) {}
            return metadata.workflow;
        }
    } catch (_e) {}
    return null;
}

function parseComfyWorkflowJson(raw) {
    if (!raw) return null;
    let data;
    if (typeof raw === 'object') data = raw;
    else {
        try {
            data = JSON.parse(raw);
        } catch {
            return null;
        }
    }
    if (!data || typeof data !== 'object') return null;
    if (data.prompt && typeof data.prompt === 'object' && !Array.isArray(data.prompt)) {
        data = data.prompt;
    }
    return data;
}

function resolveNodeTextField(node, preferredField = 'text') {
    if (!node || !node.inputs) return preferredField;
    const cType = String(node.class_type || '');
    if (/WeiLin/i.test(cType) || /PromptUI/i.test(cType)) {
        if (node.inputs.positive !== undefined || !node.inputs.text) return 'positive';
    }
    if (preferredField && node.inputs[preferredField] !== undefined) {
        return preferredField;
    }
    if (node.inputs.positive !== undefined) return 'positive';
    if (node.inputs.text !== undefined) return 'text';
    if (node.inputs.prompt !== undefined) return 'prompt';
    if (node.inputs.string !== undefined) return 'string';
    if (node.inputs.value !== undefined) return 'value';
    return preferredField || 'text';
}

function resolveNodeNegativeField(node, preferredField = 'text') {
    if (!node || !node.inputs) return preferredField;
    if (preferredField && node.inputs[preferredField] !== undefined) {
        return preferredField;
    }
    if (node.inputs.negative !== undefined) return 'negative';
    if (node.inputs.text !== undefined) return 'text';
    if (node.inputs.prompt !== undefined) return 'prompt';
    return preferredField || 'text';
}

function analyzeComfyWorkflowGraph(graph) {
    const data = parseComfyWorkflowJson(graph);
    if (!data) return null;

    const nodes = data;
    const nodeIds = Object.keys(nodes);
    if (!nodeIds.length) return null;

    const getNode = (id) => nodes[String(id)] || null;

    const textNodes = [];
    const samplerNodes = [];
    const latentNodes = [];
    const modelNodes = [];
    const saveImageNodes = [];

    nodeIds.forEach((id) => {
        const node = nodes[id];
        if (!node || typeof node !== 'object') return;
        const classType = String(node.class_type || '');
        const title = String(node._meta?.title || '');
        const inputs = node.inputs || {};

        if (/Sampler/i.test(classType) || /KSampler/i.test(classType) || /采样/i.test(title)) {
            samplerNodes.push({ id, node, classType, title });
        }

        if (/EmptyLatent/i.test(classType) || (inputs.width !== undefined && inputs.height !== undefined)) {
            latentNodes.push({ id, node, classType, title });
        }

        if (/CheckpointLoader/i.test(classType) || /UNETLoader/i.test(classType) || inputs.ckpt_name !== undefined || inputs.unet_name !== undefined) {
            modelNodes.push({ id, node, classType, title });
        }

        if (
            /CLIPTextEncode/i.test(classType) ||
            /Prompt/i.test(classType) ||
            /Text/i.test(classType) ||
            typeof inputs.text === 'string' ||
            typeof inputs.positive === 'string' ||
            typeof inputs.prompt === 'string'
        ) {
            textNodes.push({ id, node, classType, title });
        }

        if (
            /SaveImage/i.test(classType) ||
            /ImageSave/i.test(classType) ||
            inputs.filename_prefix !== undefined ||
            /保存/i.test(title)
        ) {
            saveImageNodes.push({ id, node, classType, title });
        }
    });

    let mainSampler = null;
    if (samplerNodes.length > 0) {
        mainSampler = samplerNodes.find(s => s.classType === 'KSampler') || samplerNodes[0];
    }

    let positiveNodeId = '';
    let positiveField = 'text';
    let negativeNodeId = '';
    let negativeField = 'text';

    function traceToTextNode(link, depth = 0) {
        if (!link || depth > 10) return null;
        const targetId = Array.isArray(link) ? String(link[0]) : String(link);
        const target = getNode(targetId);
        if (!target) return null;

        const cType = String(target.class_type || '');
        const inputs = target.inputs || {};

        if (/WeiLin/i.test(cType) || /PromptUI/i.test(cType) || typeof inputs.positive === 'string') {
            return { id: targetId, field: 'positive' };
        }
        if (/CLIPTextEncode/i.test(cType) || typeof inputs.text === 'string') {
            return { id: targetId, field: 'text' };
        }
        if (typeof inputs.prompt === 'string') {
            return { id: targetId, field: 'prompt' };
        }
        if (typeof inputs.string === 'string') {
            return { id: targetId, field: 'string' };
        }
        if (typeof inputs.value === 'string' && /primitive/i.test(cType)) {
            return { id: targetId, field: 'value' };
        }

        for (const key of ['conditioning', 'positive', 'negative', 'conditioning_to', 'clip', 'text', 'opt_clip', 'opt_text']) {
            if (inputs[key] && (Array.isArray(inputs[key]) || typeof inputs[key] === 'string')) {
                const res = traceToTextNode(inputs[key], depth + 1);
                if (res) return res;
            }
        }
        return null;
    }

    if (mainSampler) {
        const inputs = mainSampler.node.inputs || {};
        if (inputs.positive) {
            const res = traceToTextNode(inputs.positive);
            if (res) {
                positiveNodeId = res.id;
                positiveField = res.field;
            }
        }
        if (inputs.negative) {
            const res = traceToTextNode(inputs.negative);
            if (res) {
                negativeNodeId = res.id;
                negativeField = res.field;
            }
        }
    }

    // Fallback heuristic if tracing didn't find positive / negative
    if (!positiveNodeId || !negativeNodeId) {
        textNodes.forEach(({ id, node, title, classType }) => {
            const textVal = String(node.inputs?.text || node.inputs?.positive || node.inputs?.prompt || '');
            const isNegativeHint = /neg|反向|负面/i.test(title) || /worst quality|lowres|bad anatomy|blurry|watermark/i.test(textVal);
            const isPositiveHint = /pos|正向|正面|weilin/i.test(title) || /WeiLin/i.test(classType) || /masterpiece|best quality|1girl/i.test(textVal);

            if (isNegativeHint && !negativeNodeId) {
                negativeNodeId = id;
                negativeField = resolveNodeNegativeField(node, 'text');
            } else if (isPositiveHint && !positiveNodeId) {
                positiveNodeId = id;
                positiveField = resolveNodeTextField(node, 'positive');
            }
        });

        if (!positiveNodeId && textNodes.length >= 1) {
            const remaining = textNodes.filter(t => t.id !== negativeNodeId);
            if (remaining.length) {
                positiveNodeId = remaining[0].id;
                positiveField = resolveNodeTextField(remaining[0].node, 'text');
            }
        }
        if (!negativeNodeId && textNodes.length >= 2) {
            const remaining = textNodes.filter(t => t.id !== positiveNodeId);
            if (remaining.length) {
                negativeNodeId = remaining[0].id;
                negativeField = resolveNodeNegativeField(remaining[0].node, 'text');
            }
        }
    }

    let latentNodeId = '';
    if (mainSampler && mainSampler.node.inputs?.latent_image) {
        const link = mainSampler.node.inputs.latent_image;
        const targetId = Array.isArray(link) ? String(link[0]) : String(link);
        if (getNode(targetId)) latentNodeId = targetId;
    }
    if (!latentNodeId && latentNodes.length > 0) {
        latentNodeId = latentNodes[0].id;
    }

    let modelNodeId = '';
    if (mainSampler && mainSampler.node.inputs?.model) {
        const link = mainSampler.node.inputs.model;
        const targetId = Array.isArray(link) ? String(link[0]) : String(link);
        function traceModelNode(id, depth = 0) {
            if (!id || depth > 10) return null;
            const target = getNode(id);
            if (!target) return null;
            if (/CheckpointLoader/i.test(target.class_type) || target.inputs?.ckpt_name) return id;
            if (target.inputs?.model) {
                const nextId = Array.isArray(target.inputs.model) ? target.inputs.model[0] : target.inputs.model;
                return traceModelNode(nextId, depth + 1);
            }
            return id;
        }
        modelNodeId = traceModelNode(targetId) || targetId;
    }
    if (!modelNodeId && modelNodes.length > 0) {
        modelNodeId = modelNodes[0].id;
    }

    return {
        samplerNodeId: mainSampler ? mainSampler.id : (samplerNodes[0]?.id || ''),
        positiveNodeId,
        positiveField,
        negativeNodeId,
        negativeField,
        latentNodeId,
        modelNodeId,
        saveImageNodeId: saveImageNodes[0]?.id || '',
        customFilenamePrefix: '',
        overrideSampler: true,
        overrideSeed: true,
        overrideSize: true,
        overrideModel: false,
        allNodes: nodes,
        candidateTextNodes: textNodes,
        candidateSamplerNodes: samplerNodes,
        candidateLatentNodes: latentNodes,
        candidateModelNodes: modelNodes,
        candidateSaveImageNodes: saveImageNodes,
    };
}

function getWorkflowMapping(workflow) {
    if (!workflow) return null;
    const jsonToAnalyze = workflow.json || getSettings().comfyuiWorkflowJson;
    const graph = parseComfyWorkflowJson(jsonToAnalyze);
    if (!graph) return workflow.mapping || null;

    if (workflow.mapping && typeof workflow.mapping === 'object') {
        const m = workflow.mapping;
        const posValid = m.positiveNodeId && graph[m.positiveNodeId];
        const samplerValid = m.samplerNodeId && graph[m.samplerNodeId];
        if (posValid || samplerValid) {
            if (!m.saveImageNodeId && graph) {
                const auto = analyzeComfyWorkflowGraph(graph);
                if (auto?.saveImageNodeId) m.saveImageNodeId = auto.saveImageNodeId;
            }
            return m;
        }
    }

    const analyzed = analyzeComfyWorkflowGraph(graph);
    if (analyzed) {
        workflow.mapping = {
            positiveNodeId: analyzed.positiveNodeId,
            positiveField: analyzed.positiveField,
            negativeNodeId: analyzed.negativeNodeId,
            negativeField: analyzed.negativeField,
            samplerNodeId: analyzed.samplerNodeId,
            latentNodeId: analyzed.latentNodeId,
            modelNodeId: analyzed.modelNodeId,
            saveImageNodeId: analyzed.saveImageNodeId,
            customFilenamePrefix: analyzed.customFilenamePrefix || '',
            overrideSampler: true,
            overrideSeed: true,
            overrideSize: true,
            overrideModel: false,
        };
    }
    return workflow.mapping;
}

function buildComfyUiWorkflow(finalPrompt) {
    const settings = getSettings();
    const connection = getModeConnectionSettings('comfyui');
    const image = getModeImageSettings('comfyui');
    const seed = Number(image.seed);
    const resolvedSeed = Number.isFinite(seed) && seed >= 0
        ? Math.floor(seed)
        : Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    let payload;

    if (settings.comfyuiWorkflowJson) {
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

        const currentWorkflow = settings.comfyuiWorkflows?.find((item) => item.id === settings.comfyuiSelectedWorkflow);
        let mapping = getWorkflowMapping(currentWorkflow);
        let graph = parseComfyWorkflowJson(settings.comfyuiWorkflowJson);

        if (!mapping && graph) {
            mapping = analyzeComfyWorkflowGraph(graph);
            if (currentWorkflow && mapping) currentWorkflow.mapping = mapping;
        }

        const customPrefix = typeof mapping?.customFilenamePrefix === 'string' ? mapping.customFilenamePrefix.trim() : '';
        const variables = {
            prompt: finalPrompt,
            negative_prompt: settings.negative || '',
            model: connection.model,
            width: image.width,
            height: image.height,
            steps: image.steps,
            cfg: image.cfg,
            scale: image.cfg,
            sampler: settings.comfyuiSampler || 'euler',
            scheduler: settings.comfyuiScheduler || 'normal',
            seed: resolvedSeed,
            filename_prefix: customPrefix || `rbq_${dateStr}`,
        };

        if (graph && mapping) {
            graph = JSON.parse(JSON.stringify(graph));

            // 1. Positive Prompt Injection
            if (mapping.positiveNodeId && graph[mapping.positiveNodeId]) {
                const node = graph[mapping.positiveNodeId];
                if (!node.inputs) node.inputs = {};
                const field = resolveNodeTextField(node, mapping.positiveField || 'text');
                node.inputs[field] = finalPrompt;
                if (/WeiLin/i.test(node.class_type || '') || /PromptUI/i.test(node.class_type || '')) {
                    if (node.inputs.auto_random !== undefined) node.inputs.auto_random = false;
                }
            }

            // 2. Negative Prompt Injection
            if (mapping.negativeNodeId && graph[mapping.negativeNodeId]) {
                const node = graph[mapping.negativeNodeId];
                if (!node.inputs) node.inputs = {};
                const field = resolveNodeNegativeField(node, mapping.negativeField || 'text');
                node.inputs[field] = settings.negative || '';
            }

            // 3. Sampler / Seed / Steps / CFG / Scheduler Injection
            if (mapping.samplerNodeId && graph[mapping.samplerNodeId]) {
                const node = graph[mapping.samplerNodeId];
                if (!node.inputs) node.inputs = {};
                if (mapping.overrideSeed !== false) {
                    if (node.inputs.seed !== undefined) node.inputs.seed = resolvedSeed;
                    if (node.inputs.noise_seed !== undefined) node.inputs.noise_seed = resolvedSeed;
                }
                if (mapping.overrideSampler !== false) {
                    if (node.inputs.steps !== undefined) node.inputs.steps = image.steps;
                    if (node.inputs.cfg !== undefined) node.inputs.cfg = image.cfg;
                    if (node.inputs.sampler_name !== undefined && settings.comfyuiSampler) {
                        node.inputs.sampler_name = settings.comfyuiSampler;
                    }
                    if (node.inputs.scheduler !== undefined && settings.comfyuiScheduler) {
                        node.inputs.scheduler = settings.comfyuiScheduler;
                    }
                }
            }

            // 4. Latent Width / Height Injection
            if (mapping.latentNodeId && graph[mapping.latentNodeId]) {
                const node = graph[mapping.latentNodeId];
                if (!node.inputs) node.inputs = {};
                if (mapping.overrideSize !== false) {
                    if (node.inputs.width !== undefined) node.inputs.width = image.width;
                    if (node.inputs.height !== undefined) node.inputs.height = image.height;
                }
            }

            // 5. Model Checkpoint Injection (Optional)
            if (mapping.overrideModel && mapping.modelNodeId && connection.model && graph[mapping.modelNodeId]) {
                const node = graph[mapping.modelNodeId];
                if (!node.inputs) node.inputs = {};
                if (node.inputs.ckpt_name !== undefined) node.inputs.ckpt_name = connection.model;
                if (node.inputs.unet_name !== undefined) node.inputs.unet_name = connection.model;
            }

            // 6. SaveImage Node / Filename Prefix Injection & Smart Recovery
            const saveNodeId = mapping.saveImageNodeId;
            if (saveNodeId && graph[saveNodeId]) {
                const saveNode = graph[saveNodeId];
                if (!saveNode.inputs) saveNode.inputs = {};
                if (customPrefix) {
                    saveNode.inputs.filename_prefix = customPrefix;
                } else {
                    // Smart recovery: If current filename_prefix is "日期" or empty, but title has a path (like TS/%date:...)
                    const currentPrefix = String(saveNode.inputs.filename_prefix || '');
                    const titleVal = String(saveNode._meta?.title || '');
                    if ((currentPrefix === '日期' || currentPrefix === '{{filename_prefix}}' || !currentPrefix) && (/[\/%]/.test(titleVal) || /date:/i.test(titleVal))) {
                        saveNode.inputs.filename_prefix = titleVal;
                    }
                }
            }

            // 7. Resolve any remaining placeholders in the graph
            payload = resolvePureWorkflowTemplate(graph, variables);
        } else {
            payload = resolvePureWorkflowTemplate(settings.comfyuiWorkflowJson, variables);
        }
    } else {
        payload = {
            '4': {
                inputs: { ckpt_name: connection.model },
                class_type: 'CheckpointLoaderSimple',
            },
            '5': {
                inputs: {
                    width: image.width,
                    height: image.height,
                    batch_size: 1,
                },
                class_type: 'EmptyLatentImage',
            },
            '6': {
                inputs: {
                    text: finalPrompt,
                    clip: ['4', 1],
                },
                class_type: 'CLIPTextEncode',
            },
            '7': {
                inputs: {
                    text: settings.negative || '',
                    clip: ['4', 1],
                },
                class_type: 'CLIPTextEncode',
            },
            '8': {
                inputs: {
                    seed: resolvedSeed,
                    steps: image.steps,
                    cfg: image.cfg,
                    sampler_name: settings.comfyuiSampler || 'euler',
                    scheduler: settings.comfyuiScheduler || 'normal',
                    denoise: 1,
                    model: ['4', 0],
                    positive: ['6', 0],
                    negative: ['7', 0],
                    latent_image: ['5', 0],
                },
                class_type: 'KSampler',
            },
            '9': {
                inputs: {
                    samples: ['8', 0],
                    vae: ['4', 2],
                },
                class_type: 'VAEDecode',
            },
            '10': {
                inputs: {
                    filename_prefix: 'rbq',
                    images: ['9', 0],
                },
                class_type: 'SaveImage',
            },
        };
    }

    return window.RBQ.emit('buildComfyUiWorkflow', payload);
}

function resolveWorkflowTemplate(source, values) {
    const template = typeof source === 'string' ? source : JSON.stringify(source);
    const replaced = template.replace(/\{\{(\w+)\}\}/g, (_, key) => String(values[key] ?? ''));
    return JSON.parse(replaced);
}

function resolvePureWorkflowTemplate(source, values) {
    const template = typeof source === 'string' ? source : JSON.stringify(source);
    const placeholderMap = {
        prompt: ['{{prompt}}', '{{positive}}', '{{positive_prompt}}', '"正向提示词"', '"正面提示词"', '"提示词"'],
        negative_prompt: ['{{negative_prompt}}', '{{negative}}', '"反向提示词"', '"负面提示词"', '"负向提示词"'],
        model: ['{{model}}', '"模型"', '"Ultimate模型"', '"大模型"', '"基础模型"', '"UNet模型"'],
        width: ['{{width}}', '"宽度"'],
        height: ['{{height}}', '"高度"'],
        steps: ['{{steps}}', '"步数"'],
        cfg: ['{{cfg}}', '{{scale}}', '"CFG"', '"Scale"', '"引导"'],
        sampler: ['{{sampler}}', '"采样器"'],
        scheduler: ['{{scheduler}}', '"调度器"'],
        seed: ['{{seed}}', '"种子"'],
        filename_prefix: ['{{filename_prefix}}', '"日期"'],
    };

    let replaced = template;
    for (const [key, placeholders] of Object.entries(placeholderMap)) {
        if (key === 'model' && !values[key]) {
            // 如果用户未在酒馆面板显式指定模型，则保留工作流中写死的模型配置
            continue;
        }
        const value = String(values[key] ?? '');
        for (const placeholder of placeholders) {
            const hasQuotes = placeholder.startsWith('"') && placeholder.endsWith('"');
            const isStringField = key === 'prompt' || key === 'negative_prompt' || key === 'model' || key === 'sampler' || key === 'scheduler' || key === 'filename_prefix';
            let replacement = value;
            if (hasQuotes) {
                replacement = isStringField ? JSON.stringify(value) : value;
            }
            replaced = replaced.split(placeholder).join(replacement);
        }
    }
    return JSON.parse(replaced);
}

function getDefaultComfyWorkflows() {
    return [
        {
            id: 'default_t2i',
            name: '\u9ed8\u8ba4\u6587\u751f\u56fe',
            type: 'txt2img',
            mapping: {
                positiveNodeId: '6',
                positiveField: 'text',
                negativeNodeId: '7',
                negativeField: 'text',
                samplerNodeId: '8',
                latentNodeId: '5',
                modelNodeId: '4',
                saveImageNodeId: '10',
                customFilenamePrefix: '',
                overrideSampler: true,
                overrideSeed: true,
                overrideSize: true,
                overrideModel: false,
            },
            json: JSON.stringify({
                '4': {
                    inputs: { ckpt_name: '{{model}}' },
                    class_type: 'CheckpointLoaderSimple',
                },
                '5': {
                    inputs: {
                        width: '{{width}}',
                        height: '{{height}}',
                        batch_size: 1,
                    },
                    class_type: 'EmptyLatentImage',
                },
                '6': {
                    inputs: {
                        text: '{{prompt}}',
                        clip: ['4', 1],
                    },
                    class_type: 'CLIPTextEncode',
                },
                '7': {
                    inputs: {
                        text: '{{negative_prompt}}',
                        clip: ['4', 1],
                    },
                    class_type: 'CLIPTextEncode',
                },
                '8': {
                    inputs: {
                        seed: '{{seed}}',
                        steps: '{{steps}}',
                        cfg: '{{cfg}}',
                        sampler_name: '{{sampler}}',
                        scheduler: '{{scheduler}}',
                        denoise: 1,
                        model: ['4', 0],
                        positive: ['6', 0],
                        negative: ['7', 0],
                        latent_image: ['5', 0],
                    },
                    class_type: 'KSampler',
                },
                '9': {
                    inputs: {
                        samples: ['8', 0],
                        vae: ['4', 2],
                    },
                    class_type: 'VAEDecode',
                },
                '10': {
                    inputs: {
                        filename_prefix: 'rbq',
                        images: ['9', 0],
                    },
                    class_type: 'SaveImage',
                },
            }, null, 2),
        },
    ];
}

function ensureComfyWorkflowState() {
    const settings = getSettings();
    if (!Array.isArray(settings.comfyuiWorkflows) || !settings.comfyuiWorkflows.length) {
        settings.comfyuiWorkflows = getDefaultComfyWorkflows();
    }
    if (!settings.comfyuiSelectedWorkflow) {
        settings.comfyuiSelectedWorkflow = settings.comfyuiWorkflows[0]?.id || 'default_t2i';
    }
    if (!settings.comfyuiWorkflowJson) {
        const selected = settings.comfyuiWorkflows.find((item) => item.id === settings.comfyuiSelectedWorkflow) || settings.comfyuiWorkflows[0];
        settings.comfyuiWorkflowJson = selected?.json || '';
    }
}

function renderComfyWorkflowSelect() {
    ensureComfyWorkflowState();
    const settings = getSettings();
    const select = document.getElementById('st-scene-trigger-comfy-workflow-select');
    if (!(select instanceof HTMLSelectElement)) return;

    select.innerHTML = '';
    settings.comfyuiWorkflows.forEach((workflow) => {
        const option = document.createElement('option');
        option.value = workflow.id;
        option.textContent = workflow.name;
        select.append(option);
    });
    select.value = settings.comfyuiSelectedWorkflow;
}

function renderComfyWorkflowMappingCard(workflow) {
    const card = document.getElementById('st-scene-trigger-comfy-mapping-card');
    if (!card) return;

    if (!workflow || !workflow.json) {
        card.style.display = 'none';
        return;
    }
    card.style.display = 'flex';

    const analysis = analyzeComfyWorkflowGraph(workflow.json);
    if (!analysis) {
        const statusEl = document.getElementById('st-scene-trigger-comfy-mapping-status');
        if (statusEl) statusEl.textContent = '当前工作流 JSON 暂无法解析拓扑（可能是非标准结构或空内容）。';
        return;
    }

    const mapping = getWorkflowMapping(workflow) || analysis;

    const statusEl = document.getElementById('st-scene-trigger-comfy-mapping-status');
    if (statusEl) {
        statusEl.innerHTML = `已探测到 <b>${Object.keys(analysis.allNodes).length}</b> 个节点。系统已自动建立绑定，你可根据需要在下方指定对应节点：`;
    }

    function populateMapSelect(selectId, candidates, currentVal, emptyLabel) {
        const sel = document.getElementById(selectId);
        if (!(sel instanceof HTMLSelectElement)) return;
        sel.innerHTML = '';
        const emptyOpt = document.createElement('option');
        emptyOpt.value = '';
        emptyOpt.textContent = emptyLabel;
        sel.appendChild(emptyOpt);

        let hasSelected = false;
        candidates.forEach(({ id, classType, title }) => {
            const opt = document.createElement('option');
            opt.value = id;
            opt.textContent = `[Node ${id}] ${classType}${title && title !== classType ? ' (' + title + ')' : ''}`;
            if (String(id) === String(currentVal)) {
                opt.selected = true;
                hasSelected = true;
            }
            sel.appendChild(opt);
        });

        if (currentVal && !hasSelected) {
            const extraOpt = document.createElement('option');
            extraOpt.value = currentVal;
            extraOpt.textContent = `[Node ${currentVal}] (已自定义指定)`;
            extraOpt.selected = true;
            sel.appendChild(extraOpt);
        }
    }

    populateMapSelect('st-scene-trigger-comfy-map-positive', analysis.candidateTextNodes, mapping.positiveNodeId, '-- 未指定 / 依赖文本占位符 --');
    populateMapSelect('st-scene-trigger-comfy-map-negative', analysis.candidateTextNodes, mapping.negativeNodeId, '-- 未指定 / 无负面词 --');
    populateMapSelect('st-scene-trigger-comfy-map-sampler', analysis.candidateSamplerNodes, mapping.samplerNodeId, '-- 未指定 / 保持工作流原样 --');
    populateMapSelect('st-scene-trigger-comfy-map-latent', analysis.candidateLatentNodes, mapping.latentNodeId, '-- 未指定 / 保持原尺寸 --');
    populateMapSelect('st-scene-trigger-comfy-map-model', analysis.candidateModelNodes, mapping.modelNodeId, '-- 未指定 / 保持原模型 --');
    populateMapSelect('st-scene-trigger-comfy-map-save-image', analysis.candidateSaveImageNodes || [], mapping.saveImageNodeId, '-- 未指定 / 保持工作流原样 --');

    const prefixInput = document.getElementById('st-scene-trigger-comfy-map-filename-prefix');
    if (prefixInput instanceof HTMLInputElement) {
        prefixInput.value = mapping.customFilenamePrefix || '';
    }

    const chkSampler = document.getElementById('st-scene-trigger-comfy-map-override-sampler');
    if (chkSampler instanceof HTMLInputElement) chkSampler.checked = mapping.overrideSampler !== false;

    const chkSeed = document.getElementById('st-scene-trigger-comfy-map-override-seed');
    if (chkSeed instanceof HTMLInputElement) chkSeed.checked = mapping.overrideSeed !== false;

    const chkSize = document.getElementById('st-scene-trigger-comfy-map-override-size');
    if (chkSize instanceof HTMLInputElement) chkSize.checked = mapping.overrideSize !== false;

    const chkModel = document.getElementById('st-scene-trigger-comfy-map-override-model');
    if (chkModel instanceof HTMLInputElement) chkModel.checked = !!mapping.overrideModel;
}

let _comfyMappingEventsBound = false;
function bindComfyWorkflowMappingEvents() {
    if (_comfyMappingEventsBound) return;
    _comfyMappingEventsBound = true;

    function updateCurrentMapping(updater) {
        const settings = getSettings();
        const workflow = settings.comfyuiWorkflows.find((item) => item.id === settings.comfyuiSelectedWorkflow);
        if (!workflow) return;
        if (!workflow.mapping) workflow.mapping = {};
        updater(workflow.mapping);
        saveSettingsDebounced();
    }

    const posSel = document.getElementById('st-scene-trigger-comfy-map-positive');
    posSel?.addEventListener('change', () => {
        updateCurrentMapping(m => {
            m.positiveNodeId = posSel.value;
            const settings = getSettings();
            const workflow = settings.comfyuiWorkflows.find((item) => item.id === settings.comfyuiSelectedWorkflow);
            const graph = parseComfyWorkflowJson(workflow?.json || settings.comfyuiWorkflowJson);
            const targetNode = graph?.[posSel.value];
            if (targetNode) {
                m.positiveField = resolveNodeTextField(targetNode, 'text');
            }
        });
    });

    const negSel = document.getElementById('st-scene-trigger-comfy-map-negative');
    negSel?.addEventListener('change', () => {
        updateCurrentMapping(m => {
            m.negativeNodeId = negSel.value;
            const settings = getSettings();
            const workflow = settings.comfyuiWorkflows.find((item) => item.id === settings.comfyuiSelectedWorkflow);
            const graph = parseComfyWorkflowJson(workflow?.json || settings.comfyuiWorkflowJson);
            const targetNode = graph?.[negSel.value];
            if (targetNode) {
                m.negativeField = resolveNodeNegativeField(targetNode, 'text');
            }
        });
    });

    const samplerSel = document.getElementById('st-scene-trigger-comfy-map-sampler');
    samplerSel?.addEventListener('change', () => {
        updateCurrentMapping(m => { m.samplerNodeId = samplerSel.value; });
    });

    const latentSel = document.getElementById('st-scene-trigger-comfy-map-latent');
    latentSel?.addEventListener('change', () => {
        updateCurrentMapping(m => { m.latentNodeId = latentSel.value; });
    });

    const modelSel = document.getElementById('st-scene-trigger-comfy-map-model');
    modelSel?.addEventListener('change', () => {
        updateCurrentMapping(m => { m.modelNodeId = modelSel.value; });
    });

    const saveImageSel = document.getElementById('st-scene-trigger-comfy-map-save-image');
    saveImageSel?.addEventListener('change', () => {
        updateCurrentMapping(m => { m.saveImageNodeId = saveImageSel.value; });
    });

    const prefixInput = document.getElementById('st-scene-trigger-comfy-map-filename-prefix');
    prefixInput?.addEventListener('input', () => {
        updateCurrentMapping(m => { m.customFilenamePrefix = prefixInput.value; });
    });

    const chkSampler = document.getElementById('st-scene-trigger-comfy-map-override-sampler');
    chkSampler?.addEventListener('change', () => {
        updateCurrentMapping(m => { m.overrideSampler = chkSampler.checked; });
    });

    const chkSeed = document.getElementById('st-scene-trigger-comfy-map-override-seed');
    chkSeed?.addEventListener('change', () => {
        updateCurrentMapping(m => { m.overrideSeed = chkSeed.checked; });
    });

    const chkSize = document.getElementById('st-scene-trigger-comfy-map-override-size');
    chkSize?.addEventListener('change', () => {
        updateCurrentMapping(m => { m.overrideSize = chkSize.checked; });
    });

    const chkModel = document.getElementById('st-scene-trigger-comfy-map-override-model');
    chkModel?.addEventListener('change', () => {
        updateCurrentMapping(m => { m.overrideModel = chkModel.checked; });
    });

    document.getElementById('st-scene-trigger-comfy-workflow-retrace')?.addEventListener('click', () => {
        const settings = getSettings();
        const workflow = settings.comfyuiWorkflows.find((item) => item.id === settings.comfyuiSelectedWorkflow);
        if (!workflow) return;
        const content = getWorkflowEditorContent() || workflow.json;
        const fresh = analyzeComfyWorkflowGraph(content);
        if (!fresh) {
            toastr.warning('工作流 JSON 格式无效，无法解析拓扑');
            return;
        }
        workflow.mapping = {
            positiveNodeId: fresh.positiveNodeId,
            positiveField: fresh.positiveField,
            negativeNodeId: fresh.negativeNodeId,
            negativeField: fresh.negativeField,
            samplerNodeId: fresh.samplerNodeId,
            latentNodeId: fresh.latentNodeId,
            modelNodeId: fresh.modelNodeId,
            overrideSampler: true,
            overrideSeed: true,
            overrideSize: true,
            overrideModel: false,
        };
        saveSettingsDebounced();
        renderComfyWorkflowMappingCard(workflow);
        toastr.success(`已重新识别绑定：正面(Node ${fresh.positiveNodeId || '未指定'})、负面(Node ${fresh.negativeNodeId || '未指定'})、采样器(Node ${fresh.samplerNodeId || '未指定'})`);
    });
}

function syncComfyWorkflowEditor() {
    ensureComfyWorkflowState();
    renderComfyWorkflowSelect();
    const settings = getSettings();
    const workflow = settings.comfyuiWorkflows.find((item) => item.id === settings.comfyuiSelectedWorkflow);
    const editor = document.getElementById('st-scene-trigger-comfy-workflow-json');
    if (editor instanceof HTMLTextAreaElement) {
        editor.value = getSettings().comfyuiWorkflowJson || '';
    }
    renderComfyWorkflowMappingCard(workflow);
    bindComfyWorkflowMappingEvents();
}

async function refreshComfyUiCapabilities() {
    const settings = getSettings();
    if (settings.currentMode === 'comfyui') {
        const required = await requestComfySamplerInfo();
        const samplerValues = Array.isArray(required?.sampler_name?.[0]) ? required.sampler_name[0] : [];
        const schedulerValues = Array.isArray(required?.scheduler?.[0]) ? required.scheduler[0] : [];
        populateSelect('st-scene-trigger-comfy-sampler', samplerValues, settings.comfyuiSampler, '暂无采样器');
        populateSelect('st-scene-trigger-comfy-scheduler', schedulerValues, settings.comfyuiScheduler, '暂无调度器');
    }
    const models = await requestModels();
    populateModelSelect(models, getModeConnectionSettings(settings.currentMode).model);
}

function loadSelectedWorkflowIntoEditor() {
    ensureComfyWorkflowState();
    const settings = getSettings();
    const workflow = settings.comfyuiWorkflows.find((item) => item.id === settings.comfyuiSelectedWorkflow);
    if (!workflow) return;
    settings.comfyuiWorkflowJson = workflow.json;
    const editor = document.getElementById('st-scene-trigger-comfy-workflow-json');
    if (editor instanceof HTMLTextAreaElement) {
        editor.value = workflow.json;
    }
    renderComfyWorkflowMappingCard(workflow);
}

function normalizeWorkflowName(name) {
    return String(name || '').trim().replace(/\s+/g, ' ');
}

function createWorkflowId(name) {
    const base = normalizeWorkflowName(name)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '') || `workflow_${Date.now()}`;
    return `${base}_${Date.now()}`;
}

function getWorkflowEditorContent() {
    const editor = document.getElementById('st-scene-trigger-comfy-workflow-json');
    return editor instanceof HTMLTextAreaElement ? editor.value.trim() : '';
}

function parseWorkflowEditorJson() {
    const content = getWorkflowEditorContent();
    if (!content) {
        throw new Error('工作流 JSON 不能为空');
    }
    try {
        JSON.parse(content);
    } catch {
        throw new Error('工作流 JSON 格式无效');
    }
    return content;
}

function saveSelectedWorkflowJson() {
    const settings = getSettings();
    ensureComfyWorkflowState();
    const content = parseWorkflowEditorJson();
    const workflow = settings.comfyuiWorkflows.find((item) => item.id === settings.comfyuiSelectedWorkflow);
    if (!workflow) {
        throw new Error('未找到当前工作流');
    }
    workflow.json = content;
    settings.comfyuiWorkflowJson = content;
    const graph = parseComfyWorkflowJson(content);
    if (graph) {
        if (!workflow.mapping || !workflow.mapping.positiveNodeId || !graph[workflow.mapping.positiveNodeId]) {
            delete workflow.mapping;
            workflow.mapping = getWorkflowMapping(workflow);
        }
    }
    renderComfyWorkflowMappingCard(workflow);
    saveSettingsDebounced();
    return workflow;
}

const NAI_MODELS = ['nai-diffusion-5-full', 'nai-diffusion-5-curated', 'nai-diffusion-4-5-full', 'nai-diffusion-4-5-curated'];
let _naiIsFreeOnly = false; // Module-scope: tracks relay user's free_only status
const NAI_SAMPLERS = [
    'k_euler',
    'k_euler_ancestral',
    'k_dpmpp_2s_ancestral',
    'k_dpmpp_2m_sde',
    'k_dpmpp_sde',
    'k_dpmpp_2m',
];

function buildNaiV4Payload(finalPrompt) {
    const settings = getSettings();
    const connection = getModeConnectionSettings('nai');
    const image = getModeImageSettings('nai');
    const seed = Number(image.seed);
    const resolvedSeed = Number.isFinite(seed) && seed >= 0
        ? Math.floor(seed)
        : Math.floor(Math.random() * 4294967295);
    const isV5 = String(connection.model || '').toLowerCase().includes('nai-diffusion-5');
    const varietyPlus = !isV5 && settings.naiVarietyPlus !== false;
    const negativePrompt = settings.negative || '';

    const payload = {
        input: finalPrompt,
        model: connection.model || 'nai-diffusion-5-full',
        action: 'generate',
        parameters: {
            params_version: 3,
            width: image.width,
            height: image.height,
            steps: image.steps,
            scale: image.cfg,
            sampler: settings.naiSampler || 'k_euler_ancestral',
            seed: resolvedSeed,
            n_samples: 1,
            sm: false,
            sm_dyn: false,
            dynamic_thresholding: false,
            controlnet_strength: 1,
            legacy: false,
            cfg_rescale: Number(settings.naiCfgRescale) || 0,
            uncond_scale: Number(settings.naiUncondScale) || 0,
            noise_schedule: settings.naiNoiseSchedule || 'karras',
            legacy_v3_extend: false,
            deliberate_euler_ancestral_bug: settings.naiSampler !== 'k_euler_ancestral',
            prefer_brownian: settings.naiSampler === 'k_euler_ancestral',
            skip_cfg_above_sigma: varietyPlus ? 58 : null,
            negative_prompt: negativePrompt,
            characterPrompts: [],
            v4_prompt: {
                caption: { base_caption: finalPrompt, char_captions: [] },
                use_coords: false,
                use_order: true,
                legacy_uc: false,
            },
            v4_negative_prompt: {
                caption: { base_caption: negativePrompt, char_captions: [] },
                use_coords: false,
                use_order: false,
                legacy_uc: false,
            },
        },
    };

    if (!isV5 && naiPreciseRefs.length > 0) {
        payload.parameters.director_reference_images = [];
        payload.parameters.director_reference_strength_values = [];
        payload.parameters.director_reference_information_extracted = [];
        payload.parameters.director_reference_secondary_strength_values = [];
        payload.parameters.director_reference_descriptions = [];
        payload.parameters.normalize_reference_strength_multiple = false;

        naiPreciseRefs.forEach((item) => {
            payload.parameters.director_reference_images.push(item.b64);
            payload.parameters.director_reference_strength_values.push(Number(item.strength) || 1);
            payload.parameters.director_reference_information_extracted.push(Number(item.info) || 1);
            payload.parameters.director_reference_secondary_strength_values.push(0);
            payload.parameters.director_reference_descriptions.push({
                caption: { base_caption: item.type || 'character', char_captions: [] },
                use_coords: false,
                use_order: false,
                legacy_uc: false,
            });
        });
    } else if (!isV5 && naiVibes.length > 0) {
        payload.parameters.uncond_per_vibe = true;
        payload.parameters.wonky_vibe_correlation = true;
        payload.parameters.reference_image_multiple = [];
        payload.parameters.reference_information_extracted_multiple = [];
        payload.parameters.reference_strength_multiple = [];

        naiVibes.forEach((item) => {
            payload.parameters.reference_image_multiple.push(item.tensor || item.b64);
            payload.parameters.reference_information_extracted_multiple.push(Number(item.info) || 1);
            payload.parameters.reference_strength_multiple.push(Number(item.strength) || 0.6);
        });
    }

    return window.RBQ.emit('buildNaiV4Payload', payload);
}

function fileToBase64Simple(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || '').split(',')[1] || '');
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function resizeImageForPreciseRef(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            let targetWidth = 1024;
            let targetHeight = 1536;
            const ratio = img.width / img.height;
            if (ratio > 1.1) {
                targetWidth = 1536;
                targetHeight = 1024;
            } else if (ratio >= 0.9 && ratio <= 1.1) {
                targetWidth = 1472;
                targetHeight = 1472;
            }
            const canvas = document.createElement('canvas');
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const context = canvas.getContext('2d');

            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = 'high';

            const scaleX = targetWidth / img.width;
            const scaleY = targetHeight / img.height;
            const scale = Math.min(scaleX, scaleY);
            const scaledW = img.width * scale;
            const scaledH = img.height * scale;
            const offsetX = (targetWidth - scaledW) / 2;
            const offsetY = (targetHeight - scaledH) / 2;

            context.fillStyle = '#000000';
            context.fillRect(0, 0, targetWidth, targetHeight);

            context.drawImage(img, offsetX, offsetY, scaledW, scaledH);
            const dataUrl = canvas.toDataURL('image/png');
            resolve(dataUrl.split(',')[1] || '');
        };
        img.onerror = reject;
        const reader = new FileReader();
        reader.onload = (event) => {
            img.src = String(event.target?.result || '');
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function addNaiVibe(b64, options = {}) {
    if (naiVibes.length >= 6 || naiPreciseRefs.length > 0) return null;
    const item = sanitizeNaiVibe({
        id: options.id,
        b64,
        tensor: options.tensor || null,
        info: options.info,
        strength: options.strength,
    });
    if (!item) return null;
    naiVibes.push(item);
    persistNaiAdvancedState();
    return item;
}

function removeNaiVibe(id) {
    const index = naiVibes.findIndex((item) => item.id === id);
    if (index >= 0) {
        naiVibes.splice(index, 1);
        persistNaiAdvancedState();
    }
}

function addNaiPreciseRef(b64, options = {}) {
    if (naiPreciseRefs.length >= 6 || naiVibes.length > 0) return null;
    const item = sanitizeNaiPreciseRef({
        id: options.id,
        b64,
        info: options.info,
        strength: options.strength,
        type: options.type,
    });
    if (!item) return null;
    naiPreciseRefs.push(item);
    persistNaiAdvancedState();
    return item;
}

function removeNaiPreciseRef(id) {
    const index = naiPreciseRefs.findIndex((item) => item.id === id);
    if (index >= 0) {
        naiPreciseRefs.splice(index, 1);
        persistNaiAdvancedState();
    }
}

function renderNaiVibesDeck() {
    const deck = document.getElementById('st-scene-trigger-nai-vibe-deck');
    if (!(deck instanceof HTMLElement)) return;
    deck.innerHTML = '';

    naiVibes.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'st-scene-trigger-ref-card';
        card.dataset.refId = item.id;
        card.innerHTML = `
            <div class="st-scene-trigger-ref-card-top">
              <img src="${item.b64 ? `data:image/png;base64,${item.b64}` : ''}" alt="vibe" class="st-scene-trigger-ref-thumb">
              <button class="menu_button st-scene-trigger-ref-remove" type="button" data-action="remove-vibe" data-id="${item.id}" title="移除">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <label class="st-scene-trigger-ref-slider">
              <span>强度 <em>${item.strength}</em></span>
              <input type="range" min="0" max="1" step="0.01" value="${item.strength}" data-action="vibe-strength" data-id="${item.id}">
            </label>
            <label class="st-scene-trigger-ref-slider">
              <span>信息提取 <em>${item.info}</em></span>
              <input type="range" min="0" max="1" step="0.01" value="${item.info}" data-action="vibe-info" data-id="${item.id}">
            </label>
            <div class="st-scene-trigger-ref-actions">
              <span class="st-scene-trigger-ref-badge ${item.tensor ? 'ready' : ''}">${item.tensor ? '已提取 Vibe 特征' : '仅原图，生成前将自动提取'}</span>
              <div class="st-scene-trigger-ref-action-buttons">
                ${item.tensor
                ? `<button class="menu_button st-scene-trigger-ref-mini-button" type="button" data-action="download-vibe" data-id="${item.id}"><i class="fa-solid fa-download"></i><span>导出</span></button>`
                : `<button class="menu_button st-scene-trigger-ref-mini-button" type="button" data-action="extract-vibe" data-id="${item.id}"><i class="fa-solid fa-wand-magic-sparkles"></i><span>提取</span></button>`}
              </div>
            </div>
        `;
        deck.append(card);
    });

    const addButton = document.getElementById('st-scene-trigger-nai-add-vibe');
    if (addButton instanceof HTMLButtonElement) {
        addButton.disabled = naiVibes.length >= 6 || naiPreciseRefs.length > 0;
        addButton.innerHTML = `<i class="fa-solid fa-images"></i><span>${naiPreciseRefs.length > 0
            ? '已启用精准参考，暂不可添加'
            : naiVibes.length > 0
                ? `添加氛围图 (${naiVibes.length}/6)`
                : '添加氛围图 / 导入 .naiv4vibe'}</span>`;
    }
}

function renderNaiPreciseDeck() {
    const deck = document.getElementById('st-scene-trigger-nai-precise-deck');
    if (!(deck instanceof HTMLElement)) return;
    deck.innerHTML = '';

    naiPreciseRefs.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'st-scene-trigger-ref-card';
        card.dataset.refId = item.id;
        card.innerHTML = `
            <div class="st-scene-trigger-ref-card-top">
              <img src="data:image/png;base64,${item.b64}" alt="precise" class="st-scene-trigger-ref-thumb">
              <select class="st-scene-trigger-ref-type-select" data-action="precise-type" data-id="${item.id}">
                <option value="character" ${item.type === 'character' ? 'selected' : ''}>角色</option>
                <option value="style" ${item.type === 'style' ? 'selected' : ''}>风格</option>
                <option value="character&style" ${item.type === 'character&style' ? 'selected' : ''}>角色+风格</option>
              </select>
              <button class="menu_button st-scene-trigger-ref-remove" type="button" data-action="remove-precise" data-id="${item.id}" title="移除">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <label class="st-scene-trigger-ref-slider">
              <span>强度 <em>${item.strength}</em></span>
              <input type="range" min="0" max="1" step="0.01" value="${item.strength}" data-action="precise-strength" data-id="${item.id}">
            </label>
            <label class="st-scene-trigger-ref-slider">
              <span>保真度 <em>${item.info}</em></span>
              <input type="range" min="0" max="1" step="0.01" value="${item.info}" data-action="precise-info" data-id="${item.id}">
            </label>
            <div class="st-scene-trigger-ref-badge ready">精准参考，每张约 5 Anlas</div>
        `;
        deck.append(card);
    });

    const addButton = document.getElementById('st-scene-trigger-nai-add-precise');
    if (addButton instanceof HTMLButtonElement) {
        addButton.disabled = naiPreciseRefs.length >= 6 || naiVibes.length > 0;
        addButton.innerHTML = `<i class="fa-solid fa-crosshairs"></i><span>${naiVibes.length > 0
            ? '已启用 Vibe，暂不可添加'
            : naiPreciseRefs.length > 0
                ? `添加精准参考 (${naiPreciseRefs.length}/6)`
                : '添加精准参考图'}</span>`;
    }
}

function renderNaiAdvancedDecks() {
    renderNaiVibesDeck();
    renderNaiPreciseDeck();
}

async function extractNaiVibe(id, silent = false) {
    const item = naiVibes.find((entry) => entry.id === id);
    if (!item || !item.b64) return;
    const connection = getModeConnectionSettings('nai');
    if (!connection.url) throw new Error('请先填写 NAI 接口地址');
    if (!connection.apiKey) throw new Error('请先填写 NAI Token');
    const endpoints = resolveNaiEndpoints(connection.url);
    let base = endpoints.encodeVibe;

    const button = document.querySelector(`.st-scene-trigger-ref-card[data-ref-id="${id}"] [data-action="extract-vibe"]`);
    if (button instanceof HTMLButtonElement) {
        button.disabled = true;
        button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>提取中</span>';
    }

    try {
        const formData = new FormData();
        formData.append('image', new Blob([Uint8Array.from(atob(item.b64), (char) => char.charCodeAt(0))], { type: 'image/jpeg' }), 'vibe.jpg');
        formData.append('request', JSON.stringify({
            model: connection.model || 'nai-diffusion-5-full',
            action: 'generate',
            parameters: {
                image: 'image',
                reference_image: 'image',
                reference_image_multiple: ['image'],
                images: ['image'],
            },
            image: 'image',
            reference_image: 'image',
            reference_image_multiple: ['image'],
        }));

        const response = await fetch(base, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${connection.apiKey}`,
            },
            body: formData,
        });
        if (!response.ok) {
            let errorMsg = `Vibe 特征提取失败 (${response.status})`;
            try {
                const errData = await response.json();
                const serverMsg = extractErrorString(errData);
                if (serverMsg) errorMsg = serverMsg;
            } catch {
                try { const t = await response.text(); if (t) errorMsg = t.slice(0, 150); } catch { /* noop */ }
            }
            throw new Error(errorMsg);
        }
        const bytes = new Uint8Array(await response.arrayBuffer());
        let binary = '';
        const chunkSize = 0x8000;
        for (let index = 0; index < bytes.length; index += chunkSize) {
            binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
        }
        item.tensor = btoa(binary);
        persistNaiAdvancedState();
        renderNaiVibesDeck();
        if (!silent) toastr.success('Vibe 特征提取完成', DISPLAY_NAME);
    } catch (error) {
        if (!silent) toastr.error(error.message || String(error), DISPLAY_NAME);
        throw error;
    }
}

function downloadNaiVibe(id) {
    const item = naiVibes.find((entry) => entry.id === id);
    if (!item?.tensor) return;
    const hash = Array.from(window.crypto.getRandomValues(new Uint8Array(32)))
        .map((value) => value.toString(16).padStart(2, '0'))
        .join('');
    const payload = {
        identifier: 'novelai-vibe-transfer',
        version: 1,
        type: 'image',
        image: item.b64 || '',
        id: hash,
        encodings: {
            v4full: {
                [hash]: {
                    encoding: item.tensor,
                    params: {
                        information_extracted: item.info || 1,
                    },
                },
            },
        },
        thumbnail: item.b64 ? `data:image/jpeg;base64,${item.b64}` : '',
        importInfo: {},
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vibe_${id.slice(0, 4)}.naiv4vibe`;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

async function loadJsZipClass() {
    if (typeof window !== 'undefined' && window.JSZip) return window.JSZip;
    if (typeof JSZip !== 'undefined') return JSZip;
    if (JSZipInstance) return JSZipInstance;
    try {
        JSZipInstance = bundledJsZipFactory();
        if (typeof window !== 'undefined' && !window.JSZip) {
            window.JSZip = JSZipInstance;
        }
        return JSZipInstance;
    } catch (e) {
        console.error('[RBQ] Failed to load JSZip:', e);
    }
    throw new Error('无法加载 ZIP 解压支持库');
}

async function resolveNaiResponseImageBlob(response, endpoint = '', onProgress = null) {
    // 0. 优先检测流式响应（NDJSON / SSE / stream+json），支持边下发边报告排队与生成进度
    const contentType = (response.headers?.get('content-type') || '').toLowerCase();
    const isStreamType = contentType.includes('application/x-ndjson')
        || contentType.includes('text/event-stream')
        || contentType.includes('application/stream+json');

    if (isStreamType && response.body && typeof response.body.getReader === 'function') {
        try {
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';
            let finalImageBlob = null;
            let lastProgressStatus = '';

            const handleJsonChunk = async (json) => {
                if (!json || typeof json !== 'object') return;

                // 错误判断
                if (json.status === 'error' || json.status === 'failed' || json.status === 'canceled') {
                    const msg = json.message || json.msg || json.data || json.detail || json.error || '生成失败';
                    throw new Error(`NAI 服务端返回: ${msg}`);
                }
                if (json.error || (json.code && json.code !== 200 && json.code !== 0)) {
                    const msg = (typeof json.error === 'string' ? json.error : json.error?.message)
                        || json.message || json.detail || json.msg || `错误码 ${json.code}`;
                    throw new Error(`NAI 服务端返回: ${msg}`);
                }

                // 进度反馈
                if (onProgress && json.status && json.status !== 'success') {
                    const statusText = String(json.data || json.message || json.status);
                    const posText = json.position != null ? ` (第 ${json.position} 位)` : '';
                    const progressKey = `${json.status}_${statusText}_${posText}`;
                    if (progressKey !== lastProgressStatus) {
                        lastProgressStatus = progressKey;
                        if (json.status === 'queued') {
                            const qMsg = `NAI 排队中${posText}: ${statusText || '等待计算资源'}...`;
                            if (onProgress) onProgress(qMsg);
                            setStatus(`排队中${posText}`);
                        } else if (json.status === 'running') {
                            const rMsg = `NAI 生成中: ${statusText || '正在渲染画面'}...`;
                            if (onProgress) onProgress(rMsg);
                            setStatus('正在渲染画面...');
                        } else {
                            const sMsg = `NAI 状态: ${statusText}...`;
                            if (onProgress) onProgress(sMsg);
                            setStatus(statusText);
                        }
                    }
                }

                // 图片提取（URL 或 Base64）
                const rawUrl = json.url || json.image_url || json.file_url || json.data?.[0]?.url || json.data?.url || json.output?.url || json.result?.url;
                if (rawUrl && typeof rawUrl === 'string') {
                    const targetUrl = endpoint ? new URL(rawUrl, endpoint).href : rawUrl;
                    if (onProgress) onProgress('正在下载生成的高清画质图像...');
                    setStatus('正在下载生成图像...');
                    const imgRes = await fetch(targetUrl);
                    if (!imgRes.ok) throw new Error(`获取生图文件失败 (HTTP ${imgRes.status}): ${targetUrl}`);
                    finalImageBlob = await imgRes.blob();
                    return;
                }

                let b64 = (Array.isArray(json.images) && json.images[0])
                    || (typeof json.images === 'string' && json.images)
                    || (typeof json.image === 'string' && json.image)
                    || json.data?.[0]?.b64_json
                    || json.data?.[0]?.base64
                    || json.data?.b64_json
                    || (Array.isArray(json.output) && json.output[0])
                    || (typeof json.output === 'string' && json.output);
                if (b64 && typeof b64 === 'string') {
                    b64 = b64.replace(/^data:image\/[a-z]+;base64,/, '');
                    const binary = atob(b64);
                    const u8 = new Uint8Array(binary.length);
                    for (let j = 0; j < binary.length; j++) u8[j] = binary.charCodeAt(j);
                    finalImageBlob = new Blob([u8], { type: 'image/png' });
                }
            };

            while (true) {
                const { done, value } = await reader.read();
                if (value) {
                    buffer += decoder.decode(value, { stream: !done });
                    // 将粘连的多个 JSON 对象拆开（如 `}{` 替换为 `}\n{`）
                    const normalized = buffer.replace(/\}\s*\{/g, '}\n{');
                    const lines = normalized.split(/\r?\n/);
                    buffer = lines.pop() || '';
                    for (const rawLine of lines) {
                        const line = rawLine.trim().replace(/^data:\s*/i, '');
                        if (!line || line === '[DONE]') continue;
                        try {
                            const chunkJson = JSON.parse(line);
                            await handleJsonChunk(chunkJson);
                            if (finalImageBlob) return finalImageBlob;
                        } catch (e) {
                            if (e?.message?.startsWith('NAI 服务端返回:')) throw e;
                        }
                    }
                }
                if (done) break;
            }

            if (buffer.trim()) {
                const remainingLines = buffer.replace(/\}\s*\{/g, '}\n{').split(/\r?\n/);
                for (const rawLine of remainingLines) {
                    const line = rawLine.trim().replace(/^data:\s*/i, '');
                    if (!line || line === '[DONE]') continue;
                    try {
                        const chunkJson = JSON.parse(line);
                        await handleJsonChunk(chunkJson);
                        if (finalImageBlob) return finalImageBlob;
                    } catch (e) {
                        if (e?.message?.startsWith('NAI 服务端返回:')) throw e;
                    }
                }
            }

            if (finalImageBlob) return finalImageBlob;
        } catch (streamErr) {
            if (streamErr?.message?.startsWith('NAI 服务端返回:') || streamErr?.message?.startsWith('获取生图文件失败')) {
                throw streamErr;
            }
            console.warn(`[${EXTENSION_NAME}] 流式读取失败，尝试降级为 Blob 处理:`, streamErr);
        }
    }

    // 1. 标准 Blob 解析路径（官方 ZIP、直接图片流、或非流式 JSON / 降级）
    const blob = await response.blob();
    if (blob.type.startsWith('image/')) return blob;

    const header = new Uint8Array(await blob.slice(0, 4).arrayBuffer());
    const isZip = blob.type === 'application/zip'
        || blob.type === 'application/x-zip-compressed'
        || (header[0] === 0x50 && header[1] === 0x4B);

    if (!isZip) {
        const detectedType = (header[0] === 0x89 && header[1] === 0x50)
            ? 'image/png'
            : (header[0] === 0xFF && header[1] === 0xD8)
                ? 'image/jpeg'
                : (header[0] === 0x52 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x46)
                    ? 'image/webp'
                    : null;
        if (detectedType) {
            return new Blob([await blob.arrayBuffer()], { type: detectedType });
        }

        const text = await blob.text();
        const trimmed = text.trim();

        // 2. 提取并解析所有 JSON 对象（兼容单个 JSON、NDJSON 换行分段、以及空格/粘连多 JSON）
        const normalized = trimmed.replace(/\}\s*\{/g, '}\n{');
        const lines = normalized.split(/\r?\n/).map(l => l.trim().replace(/^data:\s*/i, '')).filter(Boolean);
        const parsedObjects = [];
        for (const line of lines) {
            if (line === '[DONE]') continue;
            try {
                parsedObjects.push(JSON.parse(line));
            } catch {}
        }

        if (parsedObjects.length > 0) {
            // 从最后一个 JSON 开始倒序检查（最终结果/错误通常在末尾）
            for (let i = parsedObjects.length - 1; i >= 0; i--) {
                const json = parsedObjects[i];

                // 错误检测
                if (json.status === 'error' || json.status === 'failed' || json.status === 'canceled') {
                    const msg = json.message || json.msg || json.data || json.detail || json.error || '生成失败';
                    throw new Error(`NAI 服务端返回: ${msg}`);
                }
                const errMsg = (typeof json.error === 'string' ? json.error : json.error?.message)
                    || (json.status !== 'queued' && json.status !== 'running' && json.status !== 'success' && json.message ? json.message : null)
                    || (json.code && json.code !== 200 && json.code !== 0 ? (json.msg || json.info || `Code ${json.code}`) : null)
                    || json.error_description;
                if (errMsg) {
                    throw new Error(`NAI 服务端返回: ${errMsg}`);
                }

                // URL 提取（支持相对路径与绝对路径解析）
                const rawUrl = json.url || json.image_url || json.file_url || json.data?.[0]?.url || json.data?.url || json.output?.url || json.result?.url;
                if (rawUrl && typeof rawUrl === 'string') {
                    const targetUrl = endpoint ? new URL(rawUrl, endpoint).href : rawUrl;
                    if (onProgress) onProgress('正在下载生成的高清画质图像...');
                    setStatus('正在下载生成图像...');
                    const imgRes = await fetch(targetUrl);
                    if (!imgRes.ok) throw new Error(`获取生图文件失败 (HTTP ${imgRes.status}): ${targetUrl}`);
                    return await imgRes.blob();
                }

                // Base64 提取
                let b64 = (Array.isArray(json.images) && json.images[0])
                    || (typeof json.images === 'string' && json.images)
                    || (typeof json.image === 'string' && json.image)
                    || json.data?.[0]?.b64_json
                    || json.data?.[0]?.base64
                    || json.data?.b64_json
                    || (Array.isArray(json.output) && json.output[0])
                    || (typeof json.output === 'string' && json.output);
                if (b64 && typeof b64 === 'string') {
                    b64 = b64.replace(/^data:image\/[a-z]+;base64,/, '');
                    const binary = atob(b64);
                    const u8 = new Uint8Array(binary.length);
                    for (let j = 0; j < binary.length; j++) u8[j] = binary.charCodeAt(j);
                    return new Blob([u8], { type: 'image/png' });
                }
            }
        }

        // 3. 检测是否为 HTML 网页（如 Cloudflare 拦截、网关错误页或登录认证跳转）
        if (trimmed.startsWith('<') || trimmed.toLowerCase().includes('<!doctype') || trimmed.toLowerCase().includes('<html')) {
            const titleMatch = trimmed.match(/<title>([^<]+)<\/title>/i);
            const title = titleMatch ? titleMatch[1].trim() : '网页拦截';
            throw new Error(`NAI 端点返回了 HTML 页面 (${title})，请检查接口地址或网络代理/防红拦截。`);
        }

        // 4. 其它未识别格式：直接展示服务端下发的原始内容片段，彻底告别盲盒排查
        const preview = trimmed.slice(0, 120).replace(/\s+/g, ' ');
        throw new Error(`NAI 返回数据非有效图片 (HTTP ${response.status}): ${preview || '空内容'}`);
    }

    setStatus('正在解压图片数据...');
    if (onProgress) onProgress('正在解压图片数据...');
    const JSZipClass = await loadJsZipClass();
    const zip = await JSZipClass.loadAsync(blob);
    const file = Object.values(zip.files).find((entry) => !entry.dir && /\.(png|jpe?g|webp)$/i.test(entry.name))
        || Object.values(zip.files).find((entry) => !entry.dir);
    if (!file) {
        throw new Error('NAI 返回的压缩包中没有可用图片');
    }
    const uint8 = await file.async('uint8array');
    const fileType = /\.jpe?g$/i.test(file.name) ? 'image/jpeg' : /\.webp$/i.test(file.name) ? 'image/webp' : 'image/png';
    return new Blob([uint8], { type: fileType });
}

async function requestComfySamplerInfo() {
    const base = String(getModeConnectionSettings('comfyui').url || '').replace(/\/$/, '');
    if (!base) throw new Error('请先填写 ComfyUI 地址');
    const data = await fetchJson(`${base}/object_info/KSampler`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(2500),
    });
    return data?.KSampler?.input?.required || {};
}

function populateSelect(selectId, values, selected, fallbackLabel = '\u6682\u65e0\u53ef\u7528\u9879') {
    const select = document.getElementById(selectId);
    if (!(select instanceof HTMLSelectElement)) return;

    select.innerHTML = '';
    if (!Array.isArray(values) || !values.length) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = fallbackLabel;
        select.append(option);
        return;
    }

    values.forEach((value) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.append(option);
    });
    select.value = values.includes(selected) ? selected : values[0];
}

async function requestModels() {
    const settings = getSettings();
    const connection = getModeConnectionSettings(settings.currentMode);
    const base = String(connection.url || '').replace(/\/$/, '');
    if (!base) {
        throw new Error('请先填写接口地址');
    }

    if (settings.currentMode === 'comfyui') {
        const data = await fetchJson(`${base}/models/checkpoints`, {
            cache: 'no-store',
            headers: getRequestHeaders(),
            signal: AbortSignal.timeout(2500),
        });
        if (Array.isArray(data)) return data;
        if (Array.isArray(data.models)) return data.models;
        return [];
    }

    if (settings.currentMode === 'nai') {
        return NAI_MODELS;
    }

    if (!connection.apiKey) {
        throw new Error('\u8bf7\u5148\u586b\u5199\u63a5\u53e3\u5730\u5740\u548c\u5bc6\u94a5');
    }
    const data = await fetchJson(`${base}/models?mode=${encodeURIComponent(settings.currentMode)}`, {
        cache: 'no-store',
        headers: getRequestHeaders(),
    });
    return Array.isArray(data.models) ? data.models : [];
}

function populateModelSelect(models, selected) {
    const select = document.getElementById('st-scene-trigger-modal-model');
    if (!(select instanceof HTMLSelectElement)) return;

    select.innerHTML = '';
    if (!models.length) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = '暂无可用模型';
        select.append(option);
        return;
    }

    models.forEach((model) => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        select.append(option);
    });

    select.value = models.includes(selected) ? selected : models[0];
    updateModelDependentUi();
}

function updateModelDependentUi() {
    const settings = getSettings();
    if (settings.currentMode !== 'nai') return;
    const modelSelect = document.getElementById('st-scene-trigger-modal-model');
    const connection = getModeConnectionSettings('nai');
    const selectedModel = (modelSelect instanceof HTMLSelectElement && modelSelect.value) ? modelSelect.value : (connection.model || '');
    const isV5 = String(selectedModel || '').toLowerCase().includes('nai-diffusion-5');

    const varietyCheckbox = document.getElementById('st-scene-trigger-nai-variety');
    if (varietyCheckbox instanceof HTMLInputElement) {
        if (isV5) {
            varietyCheckbox.disabled = true;
            varietyCheckbox.closest('label')?.style.setProperty('opacity', '0.5');
            varietyCheckbox.closest('label')?.setAttribute('title', 'NovelAI V5 暂不支持 Variety+');
        } else {
            varietyCheckbox.disabled = false;
            varietyCheckbox.closest('label')?.style.setProperty('opacity', '1');
            varietyCheckbox.closest('label')?.removeAttribute('title');
        }
    }

    const titleSpan = document.getElementById('st-scene-trigger-nai-subpanel-title');
    if (titleSpan) {
        titleSpan.textContent = 'NAI 参数配置';
    }

    // Hide Vibe Transfer & Precise Reference for NAI V5 model or free tier
    const mode = document.getElementById('st-scene-trigger-nai-endpoint-mode')?.value || 'official';
    const isRbqFreeOnly = mode === 'rbq' && _naiIsFreeOnly;
    const hideVibeAndPrecise = isV5 || isRbqFreeOnly;

    const vibeSection = document.getElementById('st-scene-trigger-nai-vibe-section');
    const preciseSection = document.getElementById('st-scene-trigger-nai-precise-section');
    if (vibeSection) vibeSection.style.display = hideVibeAndPrecise ? 'none' : '';
    if (preciseSection) preciseSection.style.display = hideVibeAndPrecise ? 'none' : '';
}

function toggleHistoryFavorite(identifier) {
    if (!identifier) return false;
    const settings = getSettings();
    const history = Array.isArray(settings.history) ? settings.history : [];
    let item = history.find((it) => (it.cacheId && it.cacheId === identifier) || (it.url && it.url === identifier));
    if (!item && identifier) {
        item = history.find((it) => (it.serverUrl && it.serverUrl === identifier) ||
                                    (it.serverPreviewUrl && it.serverPreviewUrl === identifier) ||
                                    (it.serverOriginalUrl && it.serverOriginalUrl === identifier) ||
                                    (it.displayUrl && it.displayUrl === identifier));
    }
    const current = viewerState.items[viewerState.index];
    if (!item && current) {
        item = current;
        if (!history.includes(item)) {
            history.unshift(item);
        }
    }
    if (!item) return false;
    item.favorite = !item.favorite;

    if (current && ((current.cacheId && current.cacheId === identifier) || (current.url && current.url === identifier) || current === item)) {
        current.favorite = item.favorite;
    }

    // 跨端穿透：同步至会话消息 extra，确保聊天记录跨端持久化收藏状态
    const targetMsgId = (item.messageId != null && Number.isFinite(Number(item.messageId)))
        ? Number(item.messageId)
        : (current?.messageId != null && Number.isFinite(Number(current.messageId)) ? Number(current.messageId) : null);
    let finalMsgId = targetMsgId;
    const ctx = getContext?.();
    if (finalMsgId == null && Array.isArray(ctx?.chat)) {
        for (let i = ctx.chat.length - 1; i >= 0; i--) {
            const m = ctx.chat[i];
            if (!m?.extra) continue;
            if (m.extra.rbq_image?.cacheId === item.cacheId ||
                (Array.isArray(m.extra.rbq_images) && m.extra.rbq_images.some(img => img?.cacheId === item.cacheId))) {
                finalMsgId = i;
                break;
            }
        }
    }
    if (finalMsgId != null && ctx?.chat?.[finalMsgId]) {
        item.messageId = finalMsgId;
        const msg = ctx.chat[finalMsgId];
        if (!msg.extra) msg.extra = {};
        if (msg.extra.rbq_image && (msg.extra.rbq_image.cacheId === item.cacheId || msg.extra.rbq_image.url === item.url)) {
            msg.extra.rbq_image.favorite = item.favorite;
        }
        if (Array.isArray(msg.extra.rbq_images)) {
            for (const img of msg.extra.rbq_images) {
                if (img && (img.cacheId === item.cacheId || img.url === item.url)) {
                    img.favorite = item.favorite;
                }
            }
        }
        if (typeof saveChatDebounced === 'function') saveChatDebounced();
        else if (typeof ctx?.saveChatDebounced === 'function') ctx.saveChatDebounced();
    }

    saveSettingsDebounced();
    void saveSettings();
    void renderHistory();
    renderViewer();

    try {
        window.dispatchEvent(new CustomEvent('st-scene-trigger:favorite-toggled', {
            detail: { item, favorite: item.favorite, isFavorite: item.favorite }
        }));
    } catch (_favErr) {}

    if (typeof toastr !== 'undefined') {
        if (item.favorite) {
            toastr.success('已加入收藏，不受历史条数清理限制 ⭐');
        } else {
            toastr.info('已取消收藏');
        }
    }
    return item.favorite;
}

async function deleteHistoryItem(identifier, fromViewer = false) {
    if (!identifier) return;
    const settings = getSettings();
    const history = Array.isArray(settings.history) ? settings.history : [];
    const idx = history.findIndex((it) => (it.cacheId && it.cacheId === identifier) || (it.url && it.url === identifier));
    if (idx < 0) return;

    const [removed] = history.splice(idx, 1);
    if (removed?.cacheId) {
        try {
            await deleteCachedImage(removed.cacheId);
        } catch (e) {
            console.warn('[RBQ] 清理图片缓存失败:', e);
        }
    }

    if (removed?.messageId != null && Number.isFinite(Number(removed.messageId))) {
        try {
            const ctx = getContext?.();
            const msg = ctx?.chat?.[removed.messageId];
            if (msg?.extra) {
                if (msg.extra.rbq_image && (msg.extra.rbq_image.cacheId === removed.cacheId || msg.extra.rbq_image.url === removed.url)) {
                    delete msg.extra.rbq_image;
                }
                if (Array.isArray(msg.extra.rbq_images)) {
                    msg.extra.rbq_images = msg.extra.rbq_images.filter(r => r && r.cacheId !== removed.cacheId && r.url !== removed.url);
                }
            }
        } catch (_e) {}
    }

    saveSettingsDebounced();
    void saveSettings();
    void renderHistory();

    if (fromViewer) {
        const viewerIdx = viewerState.items.findIndex((it) => (it.cacheId && it.cacheId === identifier) || (it.url && it.url === identifier));
        if (viewerIdx >= 0) {
            viewerState.items.splice(viewerIdx, 1);
            if (viewerState.items.length === 0) {
                closeImageViewer();
            } else {
                if (viewerState.index >= viewerState.items.length) {
                    viewerState.index = viewerState.items.length - 1;
                }
                resetViewerZoom(false);
                renderViewer();
            }
        }
    }

    if (typeof toastr !== 'undefined') {
        toastr.success('已删除该记录并清理本地缓存 🗑️');
    }
}

async function renderHistory() {
    const container = document.getElementById('st-scene-trigger-modal-history');
    if (!container) return;

    const history = getFilteredHistoryItems();
    const visibleItems = history.slice(0, historyViewState.page * HISTORY_PAGE_SIZE);

    const listHtml = visibleItems.length
        ? (await Promise.all(visibleItems.map(async (item) => {
            let displayUrl = item.displayUrl || item.url || '';
            let thumbnailUrl = item.thumbnailUrl || displayUrl;
            try {
                displayUrl = await ensureHistoryItemDisplayUrl(item) || displayUrl;
                thumbnailUrl = await ensureHistoryItemThumbnailUrl(item) || displayUrl;
            } catch (itemErr) {
                console.warn(`[${EXTENSION_NAME}] renderHistory item cache error:`, itemErr);
            }
            const modeMeta = getModeMeta(item.mode || 'comfyui');
            const isFav = !!item.favorite;
            return `
                <article class="st-scene-trigger-history-item" data-mode-accent="${escapeHtml(modeMeta.accent)}">
                  <button class="st-scene-trigger-history-thumb" type="button" data-role="history-open-viewer" data-prompt="${escapeHtml(item.prompt || '')}" data-url="${escapeHtml(displayUrl)}" data-cache-id="${escapeHtml(item.cacheId || '')}" data-message-id="${escapeHtml(item.messageId ?? '')}">
                    <img src="${escapeHtml(thumbnailUrl || displayUrl)}" alt="${escapeHtml(item.prompt || '历史图片')}">
                    ${isFav ? '<span class="st-scene-trigger-history-fav-badge" title="已收藏"><i class="fa-solid fa-star"></i></span>' : ''}
                  </button>
                  <div class="st-scene-trigger-history-body">
                    <div class="st-scene-trigger-history-line">
                      <strong>${item.reason === 'auto' ? '自动生成' : '图像任务'}</strong>
                      <span class="st-scene-trigger-history-time">${escapeHtml(formatHistoryTime(item.createdAt))}</span>
                    </div>
                    <div class="st-scene-trigger-history-prompt">${escapeHtml(item.prompt || '')}</div>
                    <div class="st-scene-trigger-history-tags">
                      <span class="st-scene-trigger-history-badge mode">${escapeHtml(modeMeta.title)}</span>
                      ${item.model ? `<span class="st-scene-trigger-history-badge model">${escapeHtml(item.model)}</span>` : ''}
                    </div>
                    <div class="st-scene-trigger-buttons st-scene-trigger-history-actions">
                      <button class="menu_button st-scene-trigger-history-fav ${isFav ? 'active' : ''}" type="button" data-action="toggle-fav" data-cache-id="${escapeHtml(item.cacheId || '')}" title="${isFav ? '取消收藏' : '加入收藏（防清理）'}">
                        <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-star"></i>
                      </button>
                      <button class="menu_button st-scene-trigger-history-del" type="button" data-action="delete-item" data-cache-id="${escapeHtml(item.cacheId || '')}" title="删除记录及缓存">
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                      <button class="menu_button st-scene-trigger-history-open" type="button" data-role="history-open-viewer" data-prompt="${escapeHtml(item.prompt || '')}" data-url="${escapeHtml(displayUrl)}" data-cache-id="${escapeHtml(item.cacheId || '')}" data-message-id="${escapeHtml(item.messageId ?? '')}">查看大图</button>
                    </div>
                  </div>
                </article>
            `;
        }))).join('')
        : '<div class="st-scene-trigger-history-empty">暂无匹配记录</div>';

    const hasMore = visibleItems.length < history.length;
    const moreHtml = hasMore ? `
        <div class="st-scene-trigger-history-more">
          <button id="st-scene-trigger-history-load-more" class="menu_button" type="button">加载更多</button>
        </div>
    ` : '';

    const existingToolbar = container.querySelector('.st-scene-trigger-history-toolbar');
    const existingList = container.querySelector('.st-scene-trigger-history-list');
    const existingMore = container.querySelector('.st-scene-trigger-history-more-container');

    if (existingToolbar && existingList && existingMore) {
        const summary = container.querySelector('.st-scene-trigger-history-summary');
        if (summary) summary.textContent = `已显示 ${visibleItems.length} / ${history.length}`;
        existingList.innerHTML = listHtml;
        existingMore.innerHTML = moreHtml;

        const clearBtn = container.querySelector('#st-scene-trigger-history-search-clear');
        if (clearBtn instanceof HTMLElement) {
            clearBtn.style.display = historyViewState.searchQuery ? '' : 'none';
        }

        container.querySelectorAll('.st-scene-trigger-history-tag').forEach((tag) => {
            if (tag instanceof HTMLElement) {
                tag.classList.toggle('active', tag.dataset.filter === historyViewState.filterMode);
            }
        });
    } else {
        const controlsHtml = `
            <div class="st-scene-trigger-history-toolbar">
              <div class="st-scene-trigger-history-search-row">
                <div class="st-scene-trigger-history-search-wrapper">
                  <i class="fa-solid fa-magnifying-glass"></i>
                  <input id="st-scene-trigger-history-search" type="text" placeholder="搜索提示词、模型、模式..." value="${escapeHtml(historyViewState.searchQuery || '')}">
                  <button id="st-scene-trigger-history-search-clear" class="st-scene-trigger-history-search-clear" type="button" title="清空搜索" style="${historyViewState.searchQuery ? '' : 'display:none;'}">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
                <div class="st-scene-trigger-history-filter-tags">
                  <button class="st-scene-trigger-history-tag ${historyViewState.filterMode === 'all' ? 'active' : ''}" type="button" data-filter="all">全部</button>
                  <button class="st-scene-trigger-history-tag ${historyViewState.filterMode === 'favorite' ? 'active' : ''}" type="button" data-filter="favorite"><i class="fa-solid fa-star"></i> 仅收藏</button>
                </div>
              </div>
              <div class="st-scene-trigger-history-status-row">
                <label class="st-scene-trigger-history-filter">
                  <input id="st-scene-trigger-history-only-current" type="checkbox" ${historyViewState.onlyCurrentChat ? 'checked' : ''}>
                  <span>仅当前聊天</span>
                </label>
                <span class="st-scene-trigger-history-summary">已显示 ${visibleItems.length} / ${history.length}</span>
              </div>
            </div>
            <div class="st-scene-trigger-history-list">${listHtml}</div>
            <div class="st-scene-trigger-history-more-container">${moreHtml}</div>
        `;
        container.innerHTML = controlsHtml;

        const searchInput = container.querySelector('#st-scene-trigger-history-search');
        if (searchInput instanceof HTMLInputElement) {
            searchInput.addEventListener('input', () => {
                historyViewState.searchQuery = searchInput.value;
                historyViewState.page = 1;
                void renderHistory();
            });
        }

        const clearBtn = container.querySelector('#st-scene-trigger-history-search-clear');
        if (clearBtn instanceof HTMLElement) {
            clearBtn.addEventListener('click', () => {
                historyViewState.searchQuery = '';
                if (searchInput instanceof HTMLInputElement) searchInput.value = '';
                historyViewState.page = 1;
                void renderHistory();
            });
        }

        container.querySelectorAll('.st-scene-trigger-history-tag').forEach((tag) => {
            if (tag instanceof HTMLElement) {
                tag.addEventListener('click', () => {
                    historyViewState.filterMode = tag.dataset.filter || 'all';
                    historyViewState.page = 1;
                    void renderHistory();
                });
            }
        });

        const onlyCurrent = container.querySelector('#st-scene-trigger-history-only-current');
        if (onlyCurrent instanceof HTMLInputElement) {
            onlyCurrent.addEventListener('change', () => {
                historyViewState.onlyCurrentChat = onlyCurrent.checked;
                historyViewState.page = 1;
                void renderHistory();
            });
        }
    }

    const loadMoreBtn = container.querySelector('#st-scene-trigger-history-load-more');
    if (loadMoreBtn instanceof HTMLButtonElement) {
        loadMoreBtn.onclick = () => {
            historyViewState.page += 1;
            void renderHistory();
        };
    }

    if (!container.dataset.openViewerBound) {
        container.dataset.openViewerBound = 'true';
        container.addEventListener('click', (event) => {
            const historyOpenButton = event.target.closest('[data-role="history-open-viewer"]');
            if (!historyOpenButton) return;
            event.preventDefault();
            const rawMsgId = historyOpenButton.dataset.messageId;
            const messageId = (rawMsgId !== '' && rawMsgId != null && !Number.isNaN(Number(rawMsgId))) ? Number(rawMsgId) : null;
            void openImageViewer(
                historyOpenButton.dataset.prompt || '',
                historyOpenButton.dataset.url || '',
                {
                    messageId,
                    cacheId: historyOpenButton.dataset.cacheId || '',
                    fromHistory: true,
                },
            );
        });
    }
}

function rememberHistory(item) {
    const settings = getSettings();
    const entry = {
        mode: item.mode || settings.currentMode,
        favorite: !!item.favorite,
        ...item,
    };
    if (!Array.isArray(settings.history)) settings.history = [];
    settings.history.unshift(entry);

    // 保护收藏记录机制：收藏项目永久保留，非收藏项目按先进先出淘汰
    if (settings.history.length > HISTORY_LIMIT) {
        const favorites = [];
        const regulars = [];
        for (const it of settings.history) {
            if (it && it.favorite) {
                favorites.push(it);
            } else if (it) {
                regulars.push(it);
            }
        }
        const allowedRegulars = Math.max(50, HISTORY_LIMIT - favorites.length);
        const keptRegulars = regulars.slice(0, allowedRegulars);
        settings.history = [...favorites, ...keptRegulars].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    }

    saveSettingsDebounced();
    void saveSettings(); // 立即存盘保存设置，防止切预设或重启酒馆导致最新生图历史丢失
    void renderHistory();

    // === Sync to message.extra (Chat-level persistence, cross-device sync) ===
    let targetMsgId = (entry.messageId != null && Number.isFinite(Number(entry.messageId))) ? Number(entry.messageId) : null;
    const ctx = getContext?.();
    if (targetMsgId == null && Array.isArray(ctx?.chat)) {
        // 自动智能回填 messageId：从后往前查找包含此提示词或最新助理楼层
        for (let i = ctx.chat.length - 1; i >= 0; i--) {
            const m = ctx.chat[i];
            if (!m) continue;
            if (entry.prompt && m.mes && m.mes.includes(entry.prompt)) {
                targetMsgId = i;
                entry.messageId = i;
                break;
            }
        }
        if (targetMsgId == null) {
            for (let i = ctx.chat.length - 1; i >= 0; i--) {
                if (!ctx.chat[i]?.is_user) {
                    targetMsgId = i;
                    entry.messageId = i;
                    break;
                }
            }
        }
    }

    if (targetMsgId != null && Number.isFinite(Number(targetMsgId))) {
        try {
            const msg = ctx?.chat?.[targetMsgId];
            if (msg) {
                if (!msg.extra) msg.extra = {};
                const effectiveServerUrl = entry.serverOriginalUrl || entry.serverUrl || entry.serverPreviewUrl || null;
                const extraRecord = {
                    cacheId: entry.cacheId || null,
                    url: (entry.url && !entry.url.startsWith('blob:')) ? entry.url : effectiveServerUrl,
                    serverUrl: entry.serverUrl || null,
                    serverPreviewUrl: entry.serverPreviewUrl || null,
                    serverOriginalUrl: entry.serverOriginalUrl || null,
                    prompt: entry.prompt || '',
                    model: entry.model || '',
                    mode: entry.mode || '',
                    reason: entry.reason || '',
                    createdAt: entry.createdAt || Date.now(),
                    width: entry.width,
                    height: entry.height,
                };
                msg.extra.rbq_image = extraRecord;
                if (!Array.isArray(msg.extra.rbq_images)) {
                    msg.extra.rbq_images = [];
                }
                msg.extra.rbq_images.unshift(extraRecord);
                if (msg.extra.rbq_images.length > 20) {
                    msg.extra.rbq_images.length = 20;
                }
                if (typeof saveChatDebounced === 'function') saveChatDebounced();
                else if (typeof ctx?.saveChatDebounced === 'function') ctx.saveChatDebounced();
            }
        } catch (e) {
            console.warn('[st-scene-trigger] Failed to sync rbq_image to message.extra:', e);
        }
    }

    try {
        window.dispatchEvent(new CustomEvent('st-scene-trigger:image-generated', {
            detail: { item: entry }
        }));
    } catch (_evErr) {}

    return entry;
}

function getLatestHistoryItemByPrompt(prompt) {
    const normalized = String(prompt || '').trim();
    const history = Array.isArray(getSettings().history) ? getSettings().history : [];
    return history.find((item) => String(item.prompt || '').trim() === normalized && (item.cacheId || item.url || item.serverUrl || item.serverPreviewUrl || item.serverOriginalUrl)) || null;
}

function getLatestHistoryItemForScope(scope) {
    const scopePrompt = String(scope?.prompt || '').trim().toLowerCase();
    const hasPrompt = Boolean(scopePrompt && scopePrompt !== '[smart draw]');

    // 1. Prioritize reading from message.extra (per-message chat persistence)
    if (scope && scope.messageId != null && Number.isFinite(Number(scope.messageId))) {
        try {
            const ctx = getContext?.();
            const msg = ctx?.chat?.[scope.messageId];
            if (msg?.extra) {
                let match = null;
                if (Array.isArray(msg.extra.rbq_images)) {
                    match = msg.extra.rbq_images.find((img) => {
                        if (!img || (!img.cacheId && !img.url && !img.serverUrl && !img.serverPreviewUrl && !img.serverOriginalUrl)) return false;
                        if (!hasPrompt) return true;
                        const p = String(img.prompt || '').trim().toLowerCase();
                        return p === scopePrompt || p.includes(scopePrompt) || scopePrompt.includes(p);
                    });
                }
                if (!match && msg.extra.rbq_image) {
                    const img = msg.extra.rbq_image;
                    if (img && (img.cacheId || img.url || img.serverUrl || img.serverPreviewUrl || img.serverOriginalUrl)) {
                        const p = String(img.prompt || '').trim().toLowerCase();
                        if (!hasPrompt || p === scopePrompt || p.includes(scopePrompt) || scopePrompt.includes(p)) {
                            match = img;
                        }
                    }
                }
                // Fallback: 仅当该 scope 没有明确提示词时，才允许单图回退；有独立 prompt 时绝不借用其他分镜的图片
                if (!match && !hasPrompt) {
                    if (msg.extra.rbq_image && (msg.extra.rbq_image.cacheId || msg.extra.rbq_image.url || msg.extra.rbq_image.serverUrl || msg.extra.rbq_image.serverPreviewUrl || msg.extra.rbq_image.serverOriginalUrl)) {
                        match = msg.extra.rbq_image;
                    }
                    if (!match && Array.isArray(msg.extra.rbq_images) && msg.extra.rbq_images.length > 0) {
                        match = msg.extra.rbq_images.find(img => img && (img.cacheId || img.url || img.serverUrl || img.serverPreviewUrl || img.serverOriginalUrl));
                    }
                }
                if (match) {
                    return {
                        ...match,
                        messageId: scope.messageId,
                        chatId: scope.chatId,
                        conversationKey: scope.conversationKey,
                        ownerType: scope.ownerType,
                        ownerId: scope.ownerId,
                    };
                }
            }
        } catch (e) {
            console.warn('[st-scene-trigger] Failed to retrieve rbq_image from message.extra:', e);
        }
    }
    // 2. Fallback to settings.history
    const history = Array.isArray(getSettings().history) ? getSettings().history : [];
    // 2.1: 首先尝试 matchesHistoryScope 匹配
    let found = history.find((item) => (item.cacheId || item.url || item.serverUrl || item.serverPreviewUrl || item.serverOriginalUrl) && matchesHistoryScope(item, scope));
    // 2.2: 兜底匹配：仅在没有独立 prompt 时，才允许当前楼层 messageId 直属匹配第一张图
    if (!found && !hasPrompt && scope?.messageId != null && Number.isFinite(Number(scope.messageId))) {
        found = history.find((item) => (item.cacheId || item.url || item.serverUrl || item.serverPreviewUrl || item.serverOriginalUrl) && item.messageId != null && Number(item.messageId) === Number(scope.messageId));
    }
    // 2.3: 兜底匹配：提示词模糊包含匹配
    if (!found && hasPrompt) {
        found = history.find((item) => {
            if (!item || (!item.cacheId && !item.url && !item.serverUrl && !item.serverPreviewUrl && !item.serverOriginalUrl)) return false;
            const p2 = String(item.prompt || '').trim().toLowerCase();
            return p2 && (p2 === scopePrompt || p2.includes(scopePrompt) || scopePrompt.includes(p2));
        });
    }
    return found || null;
}

function getFilteredHistoryItems() {
    const settings = getSettings();
    const history = Array.isArray(settings.history) ? settings.history : [];
    const current = getConversationContext();
    const query = String(historyViewState.searchQuery || '').trim().toLowerCase();
    const filterMode = historyViewState.filterMode || 'all';

    return history.filter((item) => {
        if (!item) return false;
        if (historyViewState.onlyCurrentChat) {
            if (current.chatId && String(item.chatId || '') !== String(current.chatId)) return false;
            if (current.conversationKey && String(item.conversationKey || '') !== String(current.conversationKey)) return false;
        }
        if (filterMode === 'favorite' && !item.favorite) {
            return false;
        }
        if (query) {
            const prompt = String(item.prompt || '').toLowerCase();
            const model = String(item.model || '').toLowerCase();
            const mode = String(item.mode || '').toLowerCase();
            const reason = String(item.reason || '').toLowerCase();
            if (!prompt.includes(query) && !model.includes(query) && !mode.includes(query) && !reason.includes(query)) {
                return false;
            }
        }
        return true;
    });
}

function getInlineButtonAccentStyle(accent) {
    const styles = {
        comfyui: {
            background: 'linear-gradient(135deg, #79e4ff, #58a8ff)',
            color: '#061a2f',
            boxShadow: '0 10px 26px rgba(88, 168, 255, .28), inset 0 1px 0 rgba(255,255,255,.34)',
        },
        nai: {
            background: 'linear-gradient(135deg, #ff8ad8, #b26dff)',
            color: '#231133',
            boxShadow: '0 10px 26px rgba(178, 109, 255, .28), inset 0 1px 0 rgba(255,255,255,.32)',
        },
        free: {
            background: 'linear-gradient(135deg, #ffd976, #ff8f6b)',
            color: '#2e1300',
            boxShadow: '0 10px 26px rgba(255, 143, 107, .26), inset 0 1px 0 rgba(255,255,255,.32)',
        },
    };
    return styles[accent] || styles.comfyui;
}

function applyInlineButtonAccent(wrapper, accent) {
    if (!(wrapper instanceof HTMLElement)) return;
    wrapper.dataset.modeAccent = accent;
    const button = wrapper.querySelector('.st-scene-trigger-inline-button');
    if (!(button instanceof HTMLElement)) return;
    const style = getInlineButtonAccentStyle(accent);
    button.style.background = style.background;
    button.style.backgroundImage = style.background;
    button.style.color = style.color;
    button.style.boxShadow = style.boxShadow;
}

function syncUi() {
    const settings = getSettings();
    const modeMeta = getModeMeta(settings.currentMode);
    const connection = getModeConnectionSettings(settings.currentMode);
    const effectiveFloatingVisible = settings.showFloatingButton;
    debugSwitchState('syncUi:start', { effectiveFloatingVisible });
    const checkboxMap = {
        'st-scene-trigger-modal-enabled': settings.enabled,
        'st-scene-trigger-modal-auto': settings.autoGenerate,
        'st-scene-trigger-show-floating': effectiveFloatingVisible,
        'st-scene-trigger-modal-single-generation': settings.singleGenerationOnly,
        'st-scene-trigger-nai-variety': settings.naiVarietyPlus,
    };

    Object.entries(checkboxMap).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element instanceof HTMLInputElement) element.checked = Boolean(value);
    });
    document.querySelectorAll('.st-scene-trigger-field.switch[data-setting-key]').forEach((element) => {
        if (!(element instanceof HTMLElement)) return;
        const key = element.dataset.settingKey;
        if (!key) return;
        const checked = key === 'showFloatingButton'
            ? effectiveFloatingVisible
            : Boolean(settings[key]);
        element.setAttribute('aria-checked', String(checked));
    });

    const isFreeOrPlugin = settings.currentMode === 'free' || PLUGIN_MODES.has(settings.currentMode);
    const valueMap = {
        'st-scene-trigger-modal-scheduler-url': connection.url,
        'st-scene-trigger-modal-api-key': connection.apiKey,
        'st-scene-trigger-modal-poll-ms': settings.pollMs,
        'st-scene-trigger-comfy-sampler': settings.comfyuiSampler,
        'st-scene-trigger-comfy-scheduler': settings.comfyuiScheduler,
        'st-scene-trigger-comfy-size-preset': isFreeOrPlugin ? settings.freeSizePreset : settings.comfyuiSizePreset,
        'st-scene-trigger-comfy-width': isFreeOrPlugin ? settings.freeWidth : settings.comfyuiWidth,
        'st-scene-trigger-comfy-height': isFreeOrPlugin ? settings.freeHeight : settings.comfyuiHeight,
        'st-scene-trigger-comfy-steps': isFreeOrPlugin ? settings.freeSteps : settings.comfyuiSteps,
        'st-scene-trigger-comfy-cfg': isFreeOrPlugin ? settings.freeCfg : settings.comfyuiCfg,
        'st-scene-trigger-comfy-seed': isFreeOrPlugin ? settings.freeSeed : settings.comfyuiSeed,
        'st-scene-trigger-nai-size-preset': settings.naiSizePreset,
        'st-scene-trigger-nai-width': settings.naiWidth,
        'st-scene-trigger-nai-height': settings.naiHeight,
        'st-scene-trigger-nai-scale': settings.naiScale,
        'st-scene-trigger-nai-steps': settings.naiSteps,
        'st-scene-trigger-nai-seed': settings.naiSeed,
        'st-scene-trigger-nai-noise-schedule': settings.naiNoiseSchedule,
        'st-scene-trigger-nai-cfg-rescale': settings.naiCfgRescale,
        'st-scene-trigger-nai-uncond-scale': settings.naiUncondScale,
        'st-scene-trigger-free-size-preset': settings.freeSizePreset,
        'st-scene-trigger-free-width': settings.freeWidth,
        'st-scene-trigger-free-height': settings.freeHeight,
        'st-scene-trigger-free-steps': settings.freeSteps,
        'st-scene-trigger-free-cfg': settings.freeCfg,
        'st-scene-trigger-free-seed': settings.freeSeed,
        'st-scene-trigger-cache-retention-days': settings.cacheRetentionDays,
        'st-scene-trigger-modal-inline-width': (settings.inlineWidth > 300 ? 100 : settings.inlineWidth) || 100,
        'st-scene-trigger-modal-start-tag': settings.startTag,
        'st-scene-trigger-modal-end-tag': settings.endTag,
        'st-scene-trigger-modal-prefix': settings.prefix,
        'st-scene-trigger-modal-suffix': settings.suffix,
        'st-scene-trigger-modal-negative': settings.negative,
        'st-scene-trigger-nai-endpoint-mode': settings.naiEndpointMode || 'official',
        'st-scene-trigger-modal-custom-regex': settings.customRegex,
        'st-scene-trigger-modal-theme': settings.theme || 'dark',
    };

    Object.entries(valueMap).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
            element.value = String(value ?? '');
        }
    });

    applyTheme(settings.theme || 'dark');

    const target = document.getElementById('st-scene-trigger-modal-target');
    if (target instanceof HTMLSelectElement) target.value = settings.targetRole;

    const renderModeSelect = document.getElementById('st-scene-trigger-modal-render-mode');
    if (renderModeSelect instanceof HTMLSelectElement) renderModeSelect.value = settings.renderMode || 'smart';

    const modeSelect = document.getElementById('st-scene-trigger-current-mode');
    if (modeSelect instanceof HTMLSelectElement) modeSelect.value = settings.currentMode || 'comfyui';

    const naiEpSelect = document.getElementById('st-scene-trigger-nai-endpoint-mode');
    if (naiEpSelect instanceof HTMLSelectElement) {
        naiEpSelect.value = settings.naiEndpointMode || 'official';
    }
    if (settings.currentMode === 'nai' && typeof _toggleNaiEndpointUi === 'function') {
        _toggleNaiEndpointUi();
    }

    const preview = document.getElementById('st-scene-trigger-prompt-preview');
    if (preview) {
        preview.textContent = [
            settings.prefix,
            `${settings.startTag}角色描述或图像提示词${settings.endTag}`,
            settings.suffix,
        ].filter(Boolean).join('  路  ');
    }

    const modelLabel = document.getElementById('st-scene-trigger-model-label');
    if (modelLabel) modelLabel.textContent = connection.model || '未选择模型';

    populateSelect('st-scene-trigger-nai-sampler', NAI_SAMPLERS, settings.naiSampler, '暂无可用采样器');

    // Sync NAI slider display-value spans with actual saved settings
    const sliderDisplayMap = {
        'st-scene-trigger-nai-steps-val': settings.naiSteps,
        'st-scene-trigger-nai-scale-val': settings.naiScale,
        'st-scene-trigger-nai-cfg-rescale-val': settings.naiCfgRescale,
        'st-scene-trigger-nai-uncond-scale-val': settings.naiUncondScale,
    };
    Object.entries(sliderDisplayMap).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = String(value ?? '');
    });

    syncComfyWorkflowEditor();
    renderNaiAdvancedDecks();
    void updateCacheUsageUi();

    const button = document.getElementById('st-scene-trigger-floating-toggle');
    if (button) {
        if (settings.showFloatingButton) {
            button.style.removeProperty('display');
            button.classList.remove('st-scene-trigger-hidden');
        } else {
            button.style.setProperty('display', 'none', 'important');
            button.classList.add('st-scene-trigger-hidden');
            setFloatingOpen(false);
        }
    }

    document.querySelectorAll('.st-scene-trigger-inline-wrap').forEach((element) => {
        if (element instanceof HTMLElement) {
            applyInlineButtonAccent(element, modeMeta.accent);
        }
    });

    const w = (settings.inlineWidth > 300 ? 100 : settings.inlineWidth) || 100;
    document.documentElement.style.setProperty('--st-inline-img-max-width', `${w}%`);
    const inlineWidthVal = document.getElementById('st-scene-trigger-modal-inline-width-val');
    if (inlineWidthVal) inlineWidthVal.textContent = `${w}%`;

    updateModeUi();
    updateModelDependentUi();
    debugSwitchState('syncUi:end', {
        floatingButtonDisplay: document.getElementById('st-scene-trigger-floating-toggle')?.style?.display ?? null,
        showFloatingInputChecked: document.getElementById('st-scene-trigger-show-floating')?.checked ?? null,
    });
    if (typeof updateNaiRbqVisibility === 'function') updateNaiRbqVisibility();
}

function applyBooleanSetting(key, value) {
    const settings = getSettings();
    debugSwitchState('applyBooleanSetting:before', { key, nextValue: Boolean(value) });
    settings[key] = Boolean(value);

    if (key === 'showFloatingButton') {
        settings.floatingVisibilityMigrated = true;
        floatingHiddenForSession = false;
        const btn = document.getElementById('st-scene-trigger-floating-toggle');
        if (btn) {
            if (!settings.showFloatingButton) {
                btn.style.setProperty('display', 'none', 'important');
                btn.classList.add('st-scene-trigger-hidden');
                setFloatingOpen(false);
            } else {
                btn.style.removeProperty('display');
                btn.classList.remove('st-scene-trigger-hidden');
            }
        }
    }

    saveSettingsDebounced();
    void saveSettings();
    syncUi();
    if (key === 'enabled') {
        refreshMessageHandlingUi();
    }
    debugSwitchState('applyBooleanSetting:after', { key, savedValue: settings[key] });

    if (key === 'enabled') {
        setStatus(settings.enabled ? '\u5df2\u542f\u7528' : '\u5df2\u505c\u7528');
    }
}

function bindSwitchField(element) {
    if (!(element instanceof HTMLElement) || element.dataset.switchBound === 'true') return;
    element.dataset.switchBound = 'true';
    element.tabIndex = 0;
    element.setAttribute('role', 'switch');
    const input = element.querySelector('input[type="checkbox"]');
    if (input instanceof HTMLInputElement) {
        input.disabled = true;
        input.tabIndex = -1;
        input.setAttribute('aria-hidden', 'true');
    }

    const toggle = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const key = element.dataset.settingKey;
        if (!key) return;
        const settings = getSettings();
        debugSwitchState('bindSwitchField:toggle', { key, domAriaChecked: element.getAttribute('aria-checked') });
        applyBooleanSetting(key, !Boolean(settings[key]));
    };

    element.addEventListener('click', toggle);
    element.addEventListener('keydown', (event) => {
        if (event.key === ' ' || event.key === 'Enter') {
            toggle(event);
        }
    });
}

function bindTabRailDrag(container) {
    if (!(container instanceof HTMLElement) || container.dataset.dragBound === 'true') return;
    container.dataset.dragBound = 'true';
}

function saveFromModal() {
    const settings = getSettings();
    const nextMode = document.getElementById('st-scene-trigger-current-mode')?.value || 'comfyui';
    const prevMode = settings.currentMode || nextMode;
    debugSwitchState('saveFromModal:before', { nextMode, prevMode });

    // Read shared input values (these belong to the PREVIOUS mode)
    const endpointValue = document.getElementById('st-scene-trigger-modal-scheduler-url')?.value?.trim() || '';
    const apiKeyValue = document.getElementById('st-scene-trigger-modal-api-key')?.value?.trim() || '';
    const modelValue = document.getElementById('st-scene-trigger-modal-model')?.value?.trim() || '';

    // Save inputs to the PREVIOUS mode first
    if (prevMode === 'comfyui') {
        settings.comfyuiUrl = endpointValue;
        settings.comfyuiApiKey = apiKeyValue;
        settings.comfyuiModel = modelValue;
    } else if (prevMode === 'nai') {
        const epMode = document.getElementById('st-scene-trigger-nai-endpoint-mode')?.value || 'official';
        settings.naiEndpointMode = epMode;
        if (epMode === 'rbq' && typeof _rbqSelectedUrl !== 'undefined' && _rbqSelectedUrl) {
            settings.naiRbqUrl = _rbqSelectedUrl;
            settings.naiUrl = _rbqSelectedUrl;
        } else if (epMode === 'rbq') {
            // RBQ mode but probe hasn't completed yet — preserve the existing saved URL
            // instead of falling through to the official URL reset
            if (!settings.naiUrl || settings.naiUrl === 'https://image.novelai.net') {
                settings.naiUrl = settings.naiRbqUrl || '';
            }
        } else if (epMode === 'custom') {
            settings.naiUrl = endpointValue || '';
        } else {
            settings.naiUrl = 'https://image.novelai.net';
        }
        settings.naiApiKey = apiKeyValue;
        settings.naiModel = modelValue || settings.naiModel;
    } else if (PLUGIN_MODES.has(prevMode)) {
        // Persist plugin-specific data using dynamic keys if they exist, fallback to shared free slots
        settings[`${prevMode}Url`] = endpointValue;
        settings[`${prevMode}ApiKey`] = apiKeyValue;
        settings[`${prevMode}Model`] = modelValue;
    }

    // NOW switch to the new mode
    settings.currentMode = nextMode;
    settings.targetRole = document.getElementById('st-scene-trigger-modal-target')?.value || 'assistant';
    settings.renderMode = document.getElementById('st-scene-trigger-modal-render-mode')?.value || 'smart';
    const themeVal = document.getElementById('st-scene-trigger-modal-theme')?.value;
    if (themeVal) {
        settings.theme = themeVal;
        applyTheme(themeVal);
    }
    settings.pollMs = Number(document.getElementById('st-scene-trigger-modal-poll-ms')?.value || 1500);
    settings.inlineWidth = Number(document.getElementById('st-scene-trigger-modal-inline-width')?.value || 100);
    settings.comfyuiSampler = document.getElementById('st-scene-trigger-comfy-sampler')?.value || 'euler';
    settings.comfyuiScheduler = document.getElementById('st-scene-trigger-comfy-scheduler')?.value || 'normal';
    settings.comfyuiSelectedWorkflow = document.getElementById('st-scene-trigger-comfy-workflow-select')?.value || 'default_t2i';
    settings.comfyuiWorkflowJson = document.getElementById('st-scene-trigger-comfy-workflow-json')?.value || '';
    settings.comfyuiSizePreset = document.getElementById('st-scene-trigger-comfy-size-preset')?.value || 'square';
    settings.comfyuiWidth = Number(document.getElementById('st-scene-trigger-comfy-width')?.value || 1024);
    settings.comfyuiHeight = Number(document.getElementById('st-scene-trigger-comfy-height')?.value || 1024);
    settings.comfyuiSteps = Number(document.getElementById('st-scene-trigger-comfy-steps')?.value || 20);
    settings.comfyuiCfg = Number(document.getElementById('st-scene-trigger-comfy-cfg')?.value || 7);
    settings.comfyuiSeed = Number(document.getElementById('st-scene-trigger-comfy-seed')?.value ?? -1);

    const isPluginMode = PLUGIN_MODES.has(settings.currentMode);
    if (settings.currentMode === 'free' || isPluginMode) {
        settings.freeSizePreset = document.getElementById('st-scene-trigger-comfy-size-preset')?.value || 'square';
        settings.freeWidth = Number(document.getElementById('st-scene-trigger-comfy-width')?.value || 1024);
        settings.freeHeight = Number(document.getElementById('st-scene-trigger-comfy-height')?.value || 1024);
        settings.freeSteps = Number(document.getElementById('st-scene-trigger-comfy-steps')?.value || 20);
        settings.freeCfg = Number(document.getElementById('st-scene-trigger-comfy-cfg')?.value || 7);
        settings.freeSeed = Number(document.getElementById('st-scene-trigger-comfy-seed')?.value ?? -1);
    }

    settings.naiSizePreset = document.getElementById('st-scene-trigger-nai-size-preset')?.value || 'portrait';
    settings.naiWidth = Number(document.getElementById('st-scene-trigger-nai-width')?.value || 832);
    settings.naiHeight = Number(document.getElementById('st-scene-trigger-nai-height')?.value || 1216);
    settings.naiSampler = document.getElementById('st-scene-trigger-nai-sampler')?.value || 'k_euler_ancestral';
    settings.naiScale = Number(document.getElementById('st-scene-trigger-nai-scale')?.value || 6);
    settings.naiSteps = Number(document.getElementById('st-scene-trigger-nai-steps')?.value || 28);
    settings.naiCfgRescale = Number(document.getElementById('st-scene-trigger-nai-cfg-rescale')?.value || 0);
    settings.naiUncondScale = Number(document.getElementById('st-scene-trigger-nai-uncond-scale')?.value || 0);
    settings.naiSeed = Number(document.getElementById('st-scene-trigger-nai-seed')?.value || -1);
    settings.naiNoiseSchedule = document.getElementById('st-scene-trigger-nai-noise-schedule')?.value || 'karras';
    const varietyCheckbox = document.getElementById('st-scene-trigger-nai-variety');
    if (varietyCheckbox instanceof HTMLInputElement) settings.naiVarietyPlus = varietyCheckbox.checked;
    // 动态保存插件自定义配置字段的值
    const activeMode = settings.currentMode;
    const pluginMode = PLUGIN_MODES.get(activeMode);
    if (pluginMode?.meta?.settingsFields) {
        pluginMode.meta.settingsFields.forEach((field) => {
            const el = document.getElementById(field.id);
            if (el) {
                if (el instanceof HTMLInputElement && el.type === 'checkbox') {
                    settings[field.key] = el.checked;
                } else if (el instanceof HTMLInputElement && el.type === 'number') {
                    settings[field.key] = Number(el.value);
                } else {
                    settings[field.key] = el.value;
                }
            }
        });
    }
    if (document.getElementById('st-scene-trigger-free-size-preset')) {
        settings.freeSizePreset = document.getElementById('st-scene-trigger-free-size-preset')?.value || 'square';
        settings.freeWidth = Number(document.getElementById('st-scene-trigger-free-width')?.value || 1024);
        settings.freeHeight = Number(document.getElementById('st-scene-trigger-free-height')?.value || 1024);
        settings.freeSteps = Number(document.getElementById('st-scene-trigger-free-steps')?.value || 20);
        settings.freeCfg = Number(document.getElementById('st-scene-trigger-free-cfg')?.value || 7);
        settings.freeSeed = Number(document.getElementById('st-scene-trigger-free-seed')?.value || -1);
    }
    settings.cacheRetentionDays = Math.max(1, Number(document.getElementById('st-scene-trigger-cache-retention-days')?.value || 7));
    settings.startTag = document.getElementById('st-scene-trigger-modal-start-tag')?.value || '';
    settings.endTag = document.getElementById('st-scene-trigger-modal-end-tag')?.value || '';
    settings.prefix = document.getElementById('st-scene-trigger-modal-prefix')?.value || '';
    settings.suffix = document.getElementById('st-scene-trigger-modal-suffix')?.value || '';
    settings.negative = document.getElementById('st-scene-trigger-modal-negative')?.value || '';
    settings.customRegex = document.getElementById('st-scene-trigger-modal-custom-regex')?.value || '';

    // 若界面中挂载了提示词预设插件的全局提示词输入框，即时同步保存至 settings._promptPresets
    const ppPosPreModal = document.getElementById('rbq-pp-global-pos-prefix');
    const ppPosSufModal = document.getElementById('rbq-pp-global-pos-suffix');
    const ppNegModal = document.getElementById('rbq-pp-global-negative');
    const ppSelectModal = document.getElementById('rbq-pp-select');
    const ppPosModal = document.getElementById('rbq-pp-position');
    if (ppPosPreModal || ppPosSufModal || ppNegModal || ppSelectModal || ppPosModal) {
        if (!settings._promptPresets || typeof settings._promptPresets !== 'object') {
            settings._promptPresets = { presets: [] };
        }
        if (ppPosPreModal) settings._promptPresets.globalPositivePrefix = ppPosPreModal.value;
        if (ppPosSufModal) settings._promptPresets.globalPositiveSuffix = ppPosSufModal.value;
        if (ppNegModal) settings._promptPresets.globalNegative = ppNegModal.value;
        if (ppSelectModal) settings._promptPresets.activeId = ppSelectModal.value;
        if (ppPosModal) settings._promptPresets.position = ppPosModal.value;
    }

    settings.floatingVisibilityMigrated = true;

    floatingHiddenForSession = false;
    if (!settings.showFloatingButton) {
        setFloatingOpen(false);
    }

    // 实时同步保存到当前活跃的预设快照中，实现预设参数即改即存
    try {
        const gp = settings._globalProfiles;
        if (gp && Array.isArray(gp.profiles)) {
            const active = gp.profiles.find(p => p.id === gp.activeProfileId);
            if (active) {
                active.data = createProfileSnapshot(settings);
                active.updatedAt = Date.now();
            }
        }
    } catch (_e) {}

    saveSettingsDebounced();
    debugSwitchState('saveFromModal:after-assign', {
        targetRole: settings.targetRole,
        cacheRetentionDays: settings.cacheRetentionDays,
    });
    pruneExpiredHistoryEntries();
    void pruneExpiredCache().then(async () => {
        await renderHistory();
        await refreshVisibleInlineImages();
    }).catch(() => { });
    syncUi();
    refreshMessageHandlingUi();
    setStatus(settings.enabled ? '\u5df2\u542f\u7528' : '\u5df2\u505c\u7528');
}

const generationQueue = [];
let isGenerating = false;

async function processQueue() {
    if (isGenerating || generationQueue.length === 0) return;
    isGenerating = true;
    const task = generationQueue[0];
    try {
        if (generationQueue.length > 1) {
            setStatus(`排队中 (正在处理，剩余 ${generationQueue.length - 1} 个)`);
        }
        const result = await generateImageRaw(task.prompt, task.reason, task.meta, task.onProgress);
        task.resolve(result);
    } catch (error) {
        task.reject(error);
    } finally {
        generationQueue.shift();
        isGenerating = false;
        if (generationQueue.length === 0) {
            setStatus(getSettings().enabled ? '已启用' : '已停用');
        }
        void processQueue();
    }
}

async function generateImage(prompt, reason = 'manual', meta = {}, onProgress = null) {
    const settings = getSettings();
    if (!settings.singleGenerationOnly) {
        return generateImageRaw(prompt, reason, meta, onProgress);
    }

    return new Promise((resolve, reject) => {
        const queueItem = { prompt, reason, meta, onProgress, resolve, reject };
        generationQueue.push(queueItem);

        if (generationQueue.length > 1) {
            const queuePos = generationQueue.length - 1;
            setStatus(`排队中 (前面有 ${queuePos} 个任务)`);
            if (onProgress) onProgress(`正在排队等待生成... 前面还有 ${queuePos} 个任务。`);
        }

        void processQueue();
    });
}

async function generateImageRaw(prompt, reason = 'manual', meta = {}, onProgress = null) {
    const settings = getSettings();
    const mode = settings.currentMode;
    const connection = getModeConnectionSettings(mode);
    const base = String(connection.url || '').replace(/\/$/, '');
    const finalPrompt = [settings.prefix, prompt, settings.suffix].filter(Boolean).join(', ').trim();

    if (!base) throw new Error('请先填写接口地址');
    if (mode === 'comfyui' && !settings.comfyuiWorkflowJson && !connection.model) {
        throw new Error('请先选择模型');
    }
    if (mode !== 'comfyui' && !connection.model) throw new Error('请先选择模型');
    if (!finalPrompt) throw new Error('\u63d0\u793a\u8bcd\u4e0d\u80fd\u4e3a\u7a7a');

    // Modular Hook: Check for custom plugin handler
    const customMode = PLUGIN_MODES.get(mode);
    if (customMode && typeof customMode.generateFn === 'function') {
        const result = await customMode.generateFn({
            prompt: finalPrompt,
            rawPrompt: prompt,
            reason,
            meta,
            onProgress,
            settings: getSettings(),
            connection: connection,
            image: getModeImageSettings(mode)
        });

        if (result && (result.url || result.blob)) {
            const imageBlob = result.blob || await (await fetch(result.url)).blob();
            const scope = buildMessageHistoryScope(meta.messageId, finalPrompt);
            const historyItem = {
                mode: mode,
                prompt: finalPrompt,
                model: connection.model,
                reason,
                createdAt: Date.now(),
                messageId: scope.messageId,
                chatId: scope.chatId,
                conversationKey: scope.conversationKey,
                ownerType: scope.ownerType,
                ownerId: scope.ownerId,
            };
            historyItem.cacheId = await saveImageBlobToCache(historyItem, imageBlob);
            rememberHistory(historyItem);

            setStatus('生成完成');
            const displayUrl = await ensureHistoryItemDisplayUrl(historyItem);
            return { url: displayUrl, prompt: finalPrompt, model: connection.model, reason, cacheId: historyItem.cacheId };
        }
    }

    setStatus('\u4efb\u52a1\u63d0\u4ea4\u4e2d');
    const scope = buildMessageHistoryScope(meta.messageId, finalPrompt);

    if (mode === 'nai') {
        if (!connection.apiKey) throw new Error('请先填写 NAI Token 或 RBQ API Key');

        // === Pre-flight validation (mirrors relay server enforcement) ===
        const _stepsVal = Number(document.getElementById('st-scene-trigger-nai-steps')?.value || settings.naiSteps || 28);
        const _widthVal = Number(document.getElementById('st-scene-trigger-nai-width')?.value || settings.naiWidth || 832);
        const _heightVal = Number(document.getElementById('st-scene-trigger-nai-height')?.value || settings.naiHeight || 1216);
        const _isRbqMode = settings.naiEndpointMode === 'rbq';

        if (_isRbqMode) {
            const isFree = _naiIsFreeOnly;
            if (isFree) {
                // Mirror: main.py line 489
                if (_widthVal * _heightVal > 1048576) {
                    throw new Error(`图像尺寸 ${_widthVal}x${_heightVal} 超出了免费版 1MP 的限制。`);
                }
                // Mirror: main.py line 491
                if (_stepsVal > 28) {
                    throw new Error(`步数 (${_stepsVal}) 超出了免费版 28 步的限制。`);
                }
                // Mirror: main.py line 641 — free users CANNOT encode raw images
                // They can only use .naiv4vibe pre-extracted tensor files
                const hasRawVibeImages = naiVibes.some(v => !v.tensor);
                if (hasRawVibeImages) {
                    throw new Error('特征提取 (Vibe Encoding) 是一项付费功能，此密钥无法使用。请改用 .naiv4vibe 预编码文件。');
                }
                // Mirror: main.py line 506
                if (naiVibes.length > 4) {
                    throw new Error('使用超过 4 个参考图 (Vibe Transfer) 是一项付费功能。');
                }
                // Mirror: main.py — Precise Reference costs 5 Anlas per image
                if (naiPreciseRefs.length > 0) {
                    throw new Error('精准参考 (Precise Reference) 每张消耗 5 Anlas，是一项付费功能，此密钥无法使用。');
                }
            } else {
                // Paid users: still have max pixel area limit
                if (_widthVal * _heightVal > 3354624) {
                    throw new Error(`图像尺寸 ${_widthVal}x${_heightVal} 超出了最大像素面积限制 (约 1920×1088)。`);
                }
            }
        }

        setStatus('正在请求 NAI 生图...');

        if (onProgress) {
            if (naiPreciseRefs.length > 0) {
                onProgress('全量打包特征组 (每图 5 Anlas)...');
                await new Promise(r => setTimeout(r, 1500));
            } else if (naiVibes.length > 0) {
                if (naiVibes.some(v => !v.tensor)) {
                    onProgress('合成请求中并自动特征化部分原图 (每图 2 Anlas)...');
                } else {
                    onProgress('应用已编码 Tensor 特征 (免除提纯算力)...');
                    await new Promise(r => setTimeout(r, 1500));
                }
            } else {
                onProgress('正在请求集群分配运算资源...');
            }
        }

        try {
            if (naiVibes.some((item) => !item.tensor)) {
                for (const item of naiVibes) {
                    if (!item.tensor) {
                        await extractNaiVibe(item.id, true);
                    }
                }
            }

            if (onProgress) onProgress('正在请求集群分配运算资源...');

            const endpoints = resolveNaiEndpoints(connection.url);
            let endpoint = endpoints.generate;
            const payloadBody = JSON.stringify(buildNaiV4Payload(finalPrompt));
            const requestHeaders = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${connection.apiKey}`,
            };

            let response = await fetch(endpoint, {
                method: 'POST',
                headers: requestHeaders,
                body: payloadBody,
            });

            // 智能自愈：若当前端点返回 404 Not Found 或 405 Method Not Allowed，且存在备选端点，自动重试一次
            if (!response.ok && (response.status === 404 || response.status === 405) && endpoints.alternateGenerate && endpoints.alternateGenerate !== endpoint) {
                console.warn(`[${EXTENSION_NAME}] NAI 端点 ${endpoint} 返回 HTTP ${response.status}，尝试自动切换自适应备用地址: ${endpoints.alternateGenerate}`);
                try {
                    const retryRes = await fetch(endpoints.alternateGenerate, {
                        method: 'POST',
                        headers: requestHeaders,
                        body: payloadBody,
                    });
                    if (retryRes.ok || (retryRes.status !== 404 && retryRes.status !== 405)) {
                        response = retryRes;
                        endpoint = endpoints.alternateGenerate;
                    }
                } catch (retryErr) {
                    console.warn(`[${EXTENSION_NAME}] 备用端点重试异常:`, retryErr);
                }
            }

            if (!response.ok) {
                // Fallback Chinese error mapping — matches relay's main.py exactly
                const httpCnMap = {
                    400: '无效的 JSON 格式',
                    401: '无效的 API Key',
                    402: 'Anlas 点数不足，请充值后重试',
                    403: '此操作需要付费账户，此密钥无法使用。',
                    429: '上游请求过于频繁导致限流，请稍后重试。',
                    500: '生成图片时发生内部服务器错误，请稍后再试。',
                    502: '无法连接到上游生成服务，网络可能存在异常。',
                    503: '上游生成服务正忙或出现故障，请稍候重试。',
                    504: '上游生成服务响应超时，请稍后再试。',
                };
                let errMsg = httpCnMap[response.status] || `NAI 生图失败 (HTTP ${response.status})`;
                try {
                    const errData = await response.json();
                    const serverMsg = extractErrorString(errData);
                    if (serverMsg) errMsg = serverMsg;
                } catch {
                    try {
                        const rawTxt = await response.text();
                        if (rawTxt) errMsg = rawTxt.slice(0, 150);
                    } catch { /* noop */ }
                }
                throw new Error(errMsg);
            }

            setStatus('正在接收服务器响应...');
            if (onProgress) onProgress('正在接收服务器响应...');
            const imageBlob = await resolveNaiResponseImageBlob(response, endpoint, onProgress);

            const historyItem = {
                mode: 'nai',
                prompt: finalPrompt || prompt,
                model: connection.model,
                reason,
                createdAt: Date.now(),
                messageId: scope.messageId,
                chatId: scope.chatId,
                conversationKey: scope.conversationKey,
                ownerType: scope.ownerType,
                ownerId: scope.ownerId,
            };
            historyItem.cacheId = await saveImageBlobToCache(historyItem, imageBlob);
            rememberHistory(historyItem);

            setStatus('生成完成');
            const displayUrl = await ensureHistoryItemDisplayUrl(historyItem);
            return { url: displayUrl, prompt: prompt, model: connection.model, reason, cacheId: historyItem.cacheId };
        } finally {
            // Loader state handled contextually by caller
        }
    }

    let response;
    if (mode === 'comfyui') {
        if (onProgress) onProgress('正在向 ComfyUI 提交工作流参数...');
        response = await fetchJson(`${base}/prompt`, {
            method: 'POST',
            headers: getRequestHeaders(),
            body: JSON.stringify({
                prompt: buildComfyUiWorkflow(finalPrompt),
                client_id: `rbq-${Date.now()}`,
            }),
        });
    } else {
        if (!connection.apiKey) throw new Error('请先填写密钥');
        if (onProgress) onProgress('正在向远程服务器下发列队请求...');
        response = await fetchJson(`${base}/generate`, {
            method: 'POST',
            headers: getRequestHeaders(),
            body: JSON.stringify(buildGeneratePayload(finalPrompt)),
        });
    }

    if (!response.prompt_id) {
        throw new Error('生成服务没有返回 prompt_id');
    }

    if (onProgress) onProgress('任务已加入列队，正在等待处理或排队拉取结果...');
    const deadline = Date.now() + 300000;
    while (Date.now() < deadline) {
        await new Promise((resolve) => setTimeout(resolve, Math.max(500, Number(settings.pollMs) || 1500)));
        const historyResponse = await fetch(`${base}/history/${encodeURIComponent(response.prompt_id)}`, { cache: 'no-store' });
        if (historyResponse.status === 404) continue;
        if (!historyResponse.ok) throw new Error(`查询历史失败 (${historyResponse.status})`);

        const history = await historyResponse.json();
        const root = history[response.prompt_id] || history;
        const outputs = root?.outputs || {};
        const outputKeys = Object.keys(outputs);

        // Immediate error check: Don't wait 5 minutes if ComfyUI errored!
        const status = root?.status;
        if (status) {
            if (status.status_str === 'error') {
                const messages = Array.isArray(status.messages) ? status.messages : [];
                const errorItem = messages.find((m) => Array.isArray(m) && m[0] === 'execution_error')?.[1] || {};
                const nodeType = errorItem.node_type || '';
                const nodeId = errorItem.node_id ? `节点 [${errorItem.node_id}]` : '';
                const exceptionMsg = errorItem.exception_message || errorItem.exception_type || 'ComfyUI 内部执行异常';
                throw new Error(`ComfyUI 执行报错 ${nodeId}${nodeType ? ` (${nodeType})` : ''}: ${exceptionMsg}`);
            }
            if (status.completed === true && outputKeys.length === 0) {
                throw new Error('ComfyUI 任务执行已完成，但未检测到任何图片输出。请检查工作流中是否存在 SaveImage 节点且连线正确。');
            }
        }

        if (outputKeys.length > 0) {
            for (const key of outputKeys) {
                const images = outputs[key]?.images;
                if (!Array.isArray(images) || !images.length) continue;
                for (const image of images) {
                    const url = `${base}/view?${new URLSearchParams({
                        filename: image.filename,
                        subfolder: image.subfolder || '',
                        type: image.type || 'output',
                    })}`;

                    const historyItem = {
                        mode: 'comfyui',
                        prompt: finalPrompt,
                        model: connection.model,
                        url,
                        reason,
                        createdAt: Date.now(),
                        messageId: scope.messageId,
                        chatId: scope.chatId,
                        conversationKey: scope.conversationKey,
                        ownerType: scope.ownerType,
                        ownerId: scope.ownerId,
                    };
                    const savedEntry = rememberHistory(historyItem);

                    // Background cache with authentication support
                    const fetchHeaders = connection.apiKey ? { 'Authorization': `Bearer ${connection.apiKey}` } : {};
                    cacheImageFromSource(savedEntry, url, fetchHeaders);

                    setStatus('生成完成');
                    return { url, prompt: finalPrompt, model: connection.model, reason, cacheId: savedEntry.cacheId };
                }
            }
        }
    }

    throw new Error('\u751f\u6210\u8d85\u65f6\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5');
}

function getMessageTextContainer(messageElement) {
    if (!(messageElement instanceof HTMLElement)) return null;
    return messageElement.querySelector('.mes_text, [data-role="message-text"], .mes_block .mes_text, .message-body, .mes_block, .mes_text > div');
}

function getChatRoot() {
    return document.getElementById('chat');
}

function ensureMessageVisibilityObserver() {
    if (messageVisibilityObserver) return messageVisibilityObserver;
    const root = getChatRoot();
    messageVisibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const target = entry.target;
            if (!(target instanceof HTMLElement)) return;
            const messageId = Number(target.getAttribute('mesid'));
            if (Number.isFinite(messageId)) {
                queueProcessMessage(messageId);
            }
        });
    }, {
        root,
        rootMargin: '240px 0px',
        threshold: 0.01,
    });
    return messageVisibilityObserver;
}

function ensureInlineRestoreObserver() {
    if (inlineRestoreObserver) return inlineRestoreObserver;
    inlineRestoreObserver = new IntersectionObserver((entries) => {
        entries.forEach(async (entry) => {
            if (!entry.isIntersecting) return;
            const wrapper = entry.target;
            if (!(wrapper instanceof HTMLElement)) return;
            const prompt = wrapper.dataset.prompt || '';
            const messageId = Number(wrapper.dataset.messageId);
            const scope = buildMessageHistoryScope(messageId, prompt);
            const latestHistory = getLatestHistoryItemForScope(scope);
            if (latestHistory) {
                const displayUrl = await ensureHistoryItemDisplayUrl(latestHistory);
                renderInlineGeneratedImage(wrapper, { ...latestHistory, url: displayUrl });
            }
            inlineRestoreObserver?.unobserve(wrapper);
        });
    }, {
        root: null,
        rootMargin: '400px 0px',
        threshold: 0.01,
    });
    return inlineRestoreObserver;
}

function observeExistingMessages() {
    const observer = ensureMessageVisibilityObserver();
    document.querySelectorAll('.mes[mesid]').forEach((element) => observer.observe(element));
}

function hasRestorableInlineCards(anchor) {
    if (!(anchor instanceof HTMLElement)) return false;
    const wrappers = [...anchor.querySelectorAll('.st-scene-trigger-inline-wrap')];
    return wrappers.length > 0 && wrappers.every((element) => (
        element instanceof HTMLElement
        && element.querySelector('.st-scene-trigger-inline-raw')
        && element.querySelector('.st-scene-trigger-inline-ui')
    ));
}

function attachInlineCardImageImmediately(wrapper, messageId, prompt) {
    if (!(wrapper instanceof HTMLElement)) return;
    const scope = buildMessageHistoryScope(messageId, prompt);
    const latestHistory = getLatestHistoryItemForScope(scope);
    if (!latestHistory) return;

    // 1. 同步快显：若内存池中已持有有效 Blob URL 或直连 URL，0毫秒无闪烁立刻渲染
    const syncUrl = (latestHistory.cacheId && objectUrlCache.get(latestHistory.cacheId))
        || (latestHistory.url && !latestHistory.url.startsWith('blob:') ? latestHistory.url : null)
        || latestHistory.serverOriginalUrl
        || latestHistory.serverUrl
        || latestHistory.serverPreviewUrl
        || latestHistory.displayUrl;
    if (syncUrl) {
        renderInlineGeneratedImage(wrapper, { ...latestHistory, url: syncUrl });
    }

    // 2. 异步自愈确保：立即发起 IndexedDB 恢复并挂载，绝不依赖滚动或空闲等待
    void ensureHistoryItemDisplayUrl(latestHistory).then((displayUrl) => {
        if (displayUrl) {
            renderInlineGeneratedImage(wrapper, { ...latestHistory, url: displayUrl });
        }
    });

    // 3. 次级保障
    ensureInlineRestoreObserver().observe(wrapper);
}

function renderMessageCards(messageId, prompts) {
    const messageElement = document.querySelector(`.mes[mesid="${messageId}"]`);
    if (!messageElement) return;

    const anchor = getMessageTextContainer(messageElement);
    if (!(anchor instanceof HTMLElement)) return;

    const message = getContext()?.chat?.[messageId];
    const signature = String(message?.mes || '');
    if (anchor.dataset.stSceneSignature === signature && hasRestorableInlineCards(anchor)) {
        return;
    }

    anchor.querySelectorAll('.st-scene-trigger-inline-wrap:not(.rbq-sdt-card):not([data-rbq-sdt-key])').forEach((element) => element.remove());

    const renderMode = getSettings().renderMode || 'smart';

    // -- 强力深度扫描降级模式 (Fallback) --
    // 如果启用了此项，插件将绕过安全的 TreeWalker，使用暴力 RegExp 强刷 innerHTML
    if (renderMode === 'deep') {
        let html = anchor.innerHTML;
        let modified = false;

        const replaceMap = new Map();

        prompts.forEach((item, index) => {
            const dummy = document.createElement('div');
            dummy.appendChild(createInlineCardWrapper(item, messageId));
            const btnHtml = dummy.innerHTML;
            const placeholder = `__ST_BTN_PH_${index}_${Date.now()}__`;

            replaceMap.set(placeholder, btnHtml);

            if (html.includes(item.raw)) {
                html = html.split(item.raw).join(placeholder);
                modified = true;
                return;
            }

            // 被前端彻底破坏（中间注入标签/替换符），启动模糊销毁
            const escapeRegExp = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const safeContent = escapeRegExp(item.prompt);
            const fuzzyPattern = new RegExp(`\\[\\s*image[\\s\\S]*?${safeContent}[\\s\\S]*?\\]`, 'g');

            if (fuzzyPattern.test(html)) {
                html = html.replace(fuzzyPattern, placeholder);
                modified = true;
            }
        });

        if (modified) {
            replaceMap.forEach((btnHtml, placeholder) => {
                html = html.split(placeholder).join(btnHtml);
            });
            anchor.innerHTML = html;
            anchor.dataset.stSceneSignature = signature;
            const wrappers = anchor.querySelectorAll('.st-scene-trigger-inline-wrap');
            wrappers.forEach((wrapper) => {
                attachInlineCardImageImmediately(wrapper, messageId, wrapper.dataset.prompt);
            });
            // 暴力替换直接完成渲染闭环
            return;
        }
    }

    // 1. 收集所有文本节点及其在全局字符串中的位置
    // legacy模式：精确的块级标签白名单
    const BLOCK_TAGS_NL = new Set([
        'BR', 'P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
        'LI', 'OL', 'UL', 'BLOCKQUOTE', 'TD', 'TH', 'TR',
        'DETAILS', 'SUMMARY', 'PRE', 'FIGURE', 'FIGCAPTION',
        'ARTICLE', 'SECTION', 'HEADER', 'FOOTER', 'MAIN',
    ]);

    // smart模式：排除法，纯行内元素黑名单（完美兼容各种魔改前端）
    const INLINE_TAGS = new Set([
        'A', 'ABBR', 'B', 'BDI', 'BDO', 'CITE', 'CODE', 'DATA', 'DFN', 'EM', 'I', 'KBD',
        'MARK', 'Q', 'S', 'SAMP', 'SMALL', 'SPAN', 'STRONG', 'SUB', 'SUP', 'TIME', 'U', 'VAR'
        // BR 不在其中，因此会被作为 Accept 节点注入 \n
    ]);

    const textNodes = [];
    const walker = document.createTreeWalker(anchor, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
        acceptNode: (node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (renderMode === 'legacy') {
                    if (BLOCK_TAGS_NL.has(node.nodeName.toUpperCase())) return NodeFilter.FILTER_ACCEPT;
                    return NodeFilter.FILTER_SKIP;
                } else {
                    if (INLINE_TAGS.has(node.nodeName.toUpperCase())) return NodeFilter.FILTER_SKIP;
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
            return node.parentElement?.closest('.st-scene-trigger-inline-wrap')
                ? NodeFilter.FILTER_REJECT
                : NodeFilter.FILTER_ACCEPT;
        },
    });

    const normalizeText = (t) => String(t || '').replace(/\r\n/g, '\n');

    let fullText = '';
    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node.nodeType === Node.ELEMENT_NODE) {
            // 只要是换行元素就无条件补回 \n，修复 <br><br> 等连续换行导致长度错位的问题
            fullText += '\n';
        } else {
            const start = fullText.length;
            fullText += node.textContent || '';
            const end = fullText.length;
            textNodes.push({ node, start, end });
        }
    }

    if (!textNodes.length) return;

    // 归一化全文，消除 \r\n 的差异
    fullText = normalizeText(fullText);

    // 2. 直接在 DOM 重建文本上重跑正则，完全绕开 message.mes 与 DOM 对齐问题
    // 构建一个 promptKey -> item 的映射，用于快速查找
    const promptMap = new Map(prompts.map(p => [p.id, p]));

    const matches = [];
    for (const pattern of buildPatterns()) {
        // 重置 lastIndex 避免 stateful regex 问题
        pattern.regex.lastIndex = 0;
        for (const match of fullText.matchAll(pattern.regex)) {
            const rawInDom = match[0];
            const promptText = String(match[1] || '').replace(/\s+/g, ' ').trim();
            if (!promptText) continue;
            const key = `${pattern.label}:${promptText}`;
            // 从 prompts 里找对应的 item（保留原始 prompt 对象）
            const item = promptMap.get(key) ?? {
                id: key,
                label: pattern.label,
                prompt: promptText,
                raw: rawInDom,
            };
            matches.push({ item, index: match.index, end: match.index + rawInDom.length });
        }
    }

    if (!matches.length) {
        anchor.dataset.stSceneSignature = signature;
        return;
    }

    // 排序并过滤重叠
    matches.sort((a, b) => a.index - b.index);
    const nonOverlapping = [];
    let lastEnd = 0;
    for (const m of matches) {
        if (m.index >= lastEnd) {
            nonOverlapping.push(m);
            lastEnd = m.end;
        }
    }

    // 3. 从后往前替换，避免偏移失效
    // 同时记录被替换文本节点的父元素链，用于后续精准清理
    const replacedNodeParents = new Set();

    for (const m of nonOverlapping.reverse()) {
        const start = m.index;
        const end = m.end;

        // 寻找该匹配项覆盖的节点
        const covered = textNodes.filter(n => n.start < end && n.end > start);
        if (!covered.length) continue;

        // 记录所有被覆盖文本节点的父元素链（只到 anchor 为止）
        for (const tn of covered) {
            let p = tn.node.parentElement;
            while (p && p !== anchor) {
                replacedNodeParents.add(p);
                p = p.parentElement;
            }
        }

        const first = covered[0];
        const last = covered[covered.length - 1];

        // 处理核心：如果是单节点匹配（最常见），直接拆分
        if (covered.length === 1) {
            const node = first.node;
            const relStart = start - first.start;
            const relEnd = end - first.start;
            const text = node.textContent || '';

            const wrapper = createInlineCardWrapper(m.item, messageId);
            const fragment = document.createDocumentFragment();

            const before = text.slice(0, relStart);
            const after = text.slice(relEnd);

            if (before) fragment.append(document.createTextNode(before));
            fragment.append(wrapper);
            if (after) fragment.append(document.createTextNode(after));

            node.parentNode?.replaceChild(fragment, node);

            attachInlineCardImageImmediately(wrapper, messageId, m.item.prompt);
        } else {
            // 跨节点匹配（高级卡片常见）：
            const firstRelStart = start - first.start;
            const firstText = first.node.textContent || '';
            const before = firstText.slice(0, firstRelStart);

            const lastRelEnd = end - last.start;
            const lastText = last.node.textContent || '';
            const after = lastText.slice(lastRelEnd);

            const wrapper = createInlineCardWrapper(m.item, messageId);
            const frag = document.createDocumentFragment();
            if (before) frag.append(document.createTextNode(before));
            frag.append(wrapper);

            // 替换首节点
            first.node.parentNode?.replaceChild(frag, first.node);

            // 清空/截断中间节点和尾节点
            for (let i = 1; i < covered.length - 1; i++) {
                covered[i].node.textContent = '';
            }
            last.node.textContent = after;

            attachInlineCardImageImmediately(wrapper, messageId, m.item.prompt);
        }
    }

    anchor.dataset.stSceneSignature = signature;

    // 4. 精准清理：只清理被替换操作「直接影响」的父元素
    // 核心保护规则：
    //   - 有 class 或 id 的元素 → 绝对跳过（这是 ST 的 UI 组件，如 .mes_reasoning）
    //   - 未知自定义元素（如 <image>）或无 class/id 的纯结构元素 → 若变空则移除
    //   - 扫描范围仅限于「被我们操作过的父元素」，不做全局扫描
    const MUST_KEEP_SELECTOR = 'img,audio,video,canvas,svg,input,button,iframe,select,textarea';
    const SAFE_TO_REMOVE_TAGS = new Set(['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'BLOCKQUOTE', 'TD', 'TH']);

    // 从最深层到最浅层排序，避免父先于子被删
    const sortedParents = [...replacedNodeParents]
        .filter(el => el.isConnected)
        .sort((a, b) => b.contains(a) ? -1 : a.contains(b) ? 1 : 0);

    for (const el of sortedParents) {
        if (!el.isConnected) continue;
        if (el.closest('.st-scene-trigger-inline-wrap')) continue;

        // ⚠️ 核心保护：有 class 或 id 的元素是 ST 的 UI 组件，绝对不动
        if (el.className || el.id) continue;

        // 只处理已知块级标签或完全未知的自定义元素（如 <image>、<图片>）
        const isUnknown = el instanceof HTMLUnknownElement;
        if (!isUnknown && !SAFE_TO_REMOVE_TAGS.has(el.nodeName.toUpperCase())) continue;

        // 真正空：无文本内容、无我们的卡片、无媒体/交互子元素
        if (
            el.textContent.trim() === '' &&
            !el.querySelector('.st-scene-trigger-inline-wrap') &&
            !el.querySelector(MUST_KEEP_SELECTOR)
        ) {
            el.remove();
        }
    }

    // 5. 安全验证（600ms 后）：若按钮被外部扩展（如 Prompt Template）覆盖则强制重渲一次
    if (nonOverlapping.length > 0) {
        setTimeout(() => {
            const curEl = document.querySelector(`.mes[mesid="${messageId}"]`);
            if (!curEl) return;
            const curAnchor = getMessageTextContainer(curEl);
            if (!(curAnchor instanceof HTMLElement)) return;
            const curMsg = getContext()?.chat?.[messageId];
            const curSig = String(curMsg?.mes || '');
            // 签名仍匹配但按钮已消失 → 强制重渲（且只重渲一次）
            if (
                curAnchor.dataset.stSceneSignature === curSig &&
                !curAnchor.querySelector('.st-scene-trigger-inline-wrap')
            ) {
                delete curAnchor.dataset.stSceneSignature;
                const curPrompts = extractPrompts(curMsg?.mes);
                if (curPrompts.length) renderMessageCards(messageId, curPrompts);
            }
        }, 600);
    }
}

function createInlineCardWrapper(item, messageId) {

    const wrapper = document.createElement('span');
    wrapper.className = 'st-scene-trigger-inline-wrap';
    wrapper.dataset.prompt = item.prompt;
    wrapper.dataset.promptId = item.id;
    wrapper.dataset.messageId = String(messageId);
    wrapper.dataset.modeAccent = getModeMeta(getSettings().currentMode).accent;

    const rawContent = document.createElement('span');
    rawContent.className = 'st-scene-trigger-inline-raw';
    rawContent.textContent = item.raw;

    const ui = document.createElement('span');
    ui.className = 'st-scene-trigger-inline-ui';
    ui.innerHTML = `
      <button class="menu_button st-scene-trigger-generate st-scene-trigger-inline-button" type="button">生成图片</button>
      <span class="st-scene-trigger-inline-loader" style="display: none;">
        <span class="st-scene-trigger-nai-spinner"></span>
        <span class="st-scene-trigger-nai-loader-title">生成中... (SYNTHESIZING)</span>
        <span class="st-scene-trigger-nai-loader-sub">正在请求集群分配运算资源...</span>
      </span>
      <span class="st-scene-trigger-inline-result"></span>
    `;
    wrapper.append(rawContent, ui);
    applyInlineButtonAccent(wrapper, getModeMeta(getSettings().currentMode).accent);
    return wrapper;
}

function setMessageCardsHidden(messageElement, hidden) {
    const anchor = getMessageTextContainer(messageElement);
    if (!(anchor instanceof HTMLElement)) return false;
    const wrappers = [...anchor.querySelectorAll('.st-scene-trigger-inline-wrap:not(.rbq-sdt-card):not([data-rbq-sdt-key])')];
    if (!wrappers.length) return false;
    wrappers.forEach((element) => {
        if (element instanceof HTMLElement) {
            element.classList.toggle('st-scene-trigger-inline-wrap-hidden', hidden);
        }
    });
    return true;
}

function showExistingMessageCards(messageElement, message) {
    const anchor = getMessageTextContainer(messageElement);
    if (!(anchor instanceof HTMLElement)) return false;
    const signature = String(message?.mes || '');
    if (anchor.dataset.stSceneSignature !== signature) return false;
    if (!hasRestorableInlineCards(anchor)) return false;
    return setMessageCardsHidden(messageElement, false);
}

function refreshMessageHandlingUi() {
    // 关键优化：倒序优先（最新楼层在前），确保用户当前注视的最新消息最先完成解析与渲染
    const messageElements = [...document.querySelectorAll('.mes[mesid]')].reverse();
    messageElements.forEach((messageElement) => {
        if (!(messageElement instanceof HTMLElement)) return;
        const messageId = Number(messageElement.getAttribute('mesid'));
        if (!Number.isFinite(messageId)) return;
        const message = getContext()?.chat?.[messageId];
        messageVisibilityObserver?.unobserve(messageElement);
        if (!shouldHandleMessage(message)) {
            const anchor = getMessageTextContainer(messageElement);
            const hasInlineCards = anchor instanceof HTMLElement && anchor.querySelector('.st-scene-trigger-inline-wrap');
            if (hasInlineCards && !showExistingMessageCards(messageElement, message)) {
                const prompts = extractPrompts(message?.mes);
                if (prompts.length) {
                    renderMessageCards(messageId, prompts);
                }
            }
            setMessageCardsHidden(messageElement, true);
            return;
        }
        if (showExistingMessageCards(messageElement, message)) return;
        void processMessage(messageId, { allowAutoGenerate: false });
    });
}

function queueProcessMessage(messageId, force = false) {
    const id = Number(messageId);
    if (!Number.isFinite(id)) return;
    if (force) pendingForceIds.add(id);
    pendingMessageIds.add(id);

    // force=true（侧滑）时需要更长延迟（300ms），确保酒馆 DOM 渲染完成后再扫描
    // 流式输出时使用最短延迟，确保按钮超快速重渲染
    const streaming = isStreamingActive();
    const delay = streaming ? 16 : (pendingForceIds.size > 0 ? 300 : 100);
    if (processQueueTimer !== null) {
        // 如果新延迟比旧定时器剩余时间长（force 场景），重新安排
        if (!force) return; // 非 force 且已有定时器：让已有的跑完即可
        clearTimeout(processQueueTimer);
    }
    processQueueTimer = setTimeout(() => {
        processQueueTimer = null;
        const ids = [...pendingMessageIds];
        pendingMessageIds.clear();
        ids.forEach((queuedId) => {
            const shouldForce = pendingForceIds.has(queuedId);
            pendingForceIds.delete(queuedId);
            processMessage(queuedId, { force: shouldForce });
        });
    }, delay);
}

function getMessageIdFromNode(node) {
    if (!(node instanceof Element)) return null;
    if (node.matches('.st-scene-trigger-card, .st-scene-trigger-card *')) return null;
    const messageElement = node.matches('.mes[mesid]') ? node : node.closest('.mes[mesid]');
    if (!(messageElement instanceof Element)) return null;
    return Number(messageElement.getAttribute('mesid'));
}

function queueExistingMessages() {
    refreshMessageHandlingUi();
    historyViewState.page = 1;
    void renderHistory();
    void refreshVisibleInlineImages();
}

function renderInlineGeneratedImage(wrapper, result) {
    if (!(wrapper instanceof HTMLElement) || !result) return;
    // 严禁向非出图卡片（如重新解析/刷新 tag 按钮）或已显式声明非结果卡片注入图片
    if (wrapper.dataset.rbqSdtIsResult === '0' || wrapper.dataset.rbqSdtKey?.endsWith('-reparse') || wrapper.classList.contains('rbq-sdt-reparse')) {
        return;
    }
    // 正文卡片图片 URL 选择：一律优先加载轻量压缩预览图（~60KB WebP），彻底杜绝正文巨幅流量消耗
    const effectiveUrl = result.serverPreviewUrl
        || (result.url && !result.url.startsWith('blob:') && (!result.serverOriginalUrl || result.url !== result.serverOriginalUrl) ? result.url : null)
        || result.serverUrl
        || (result.url && !result.url.startsWith('blob:') ? result.url : null)
        || result.serverOriginalUrl
        || result.displayUrl
        || result.url;
    if (!effectiveUrl) return;
    result.url = effectiveUrl;
    const container = wrapper.querySelector('.st-scene-trigger-inline-result');
    if (!(container instanceof HTMLElement)) return;
    const messageId = Number(wrapper.dataset.messageId);

    // 平滑原地更新，杜绝清空 innerHTML 导致的已有图片瞬间消失与重新加载闪烁
    const existingLink = container.querySelector('.st-scene-trigger-inline-image-link');
    const existingImg = container.querySelector('.st-scene-trigger-inline-image') || container.querySelector('img');

    if (existingLink instanceof HTMLElement && existingImg instanceof HTMLImageElement) {
        if (wrapper.dataset.prompt) existingLink.dataset.prompt = wrapper.dataset.prompt;
        if (result.cacheId) existingLink.dataset.cacheId = result.cacheId;
        if (Number.isFinite(messageId)) existingLink.dataset.messageId = String(messageId);
        if (result.serverUrl) existingLink.dataset.serverUrl = result.serverUrl;
        if (result.serverPreviewUrl) existingLink.dataset.serverPreviewUrl = result.serverPreviewUrl;
        if (result.serverOriginalUrl) existingLink.dataset.serverOriginalUrl = result.serverOriginalUrl;
        wrapper.dataset.latestImageUrl = effectiveUrl;

        const currentSrc = existingImg.getAttribute('src') || existingImg.src;
        if (currentSrc !== effectiveUrl) {
            existingLink.href = effectiveUrl;
            existingLink.dataset.url = effectiveUrl;

            // 若当前图片已在稳定展示（如初次生成的 blob），在后台预载新链接，完成后静默切换，零闪烁防白屏
            if (existingImg.complete && existingImg.naturalWidth > 0) {
                const preloader = new Image();
                preloader.onload = () => {
                    if (existingImg.isConnected) {
                        existingImg.src = effectiveUrl;
                    }
                };
                preloader.src = effectiveUrl;
            } else {
                existingImg.src = effectiveUrl;
            }
        }
        container.classList.add('is-visible');
        return;
    }

    // 初次注入时构建标准 DOM
    container.innerHTML = `
      <a class="st-scene-trigger-inline-image-link" href="${escapeHtml(effectiveUrl)}" data-prompt="${escapeHtml(wrapper.dataset.prompt || '')}" data-url="${escapeHtml(effectiveUrl)}" data-cache-id="${escapeHtml(result.cacheId || '')}" data-message-id="${Number.isFinite(messageId) ? messageId : ''}">
        <img class="st-scene-trigger-inline-image" src="${escapeHtml(effectiveUrl)}" alt="generated image">
      </a>
    `;
    container.classList.add('is-visible');
    wrapper.dataset.latestImageUrl = effectiveUrl;
}

async function refreshVisibleInlineImages() {
    // 关键优化：倒序优先（最新楼层在前）+ Promise.all 并发自愈恢复，秒级直达最新楼层
    const wrappers = [...document.querySelectorAll('.st-scene-trigger-inline-wrap')].reverse();
    await Promise.all(wrappers.map(async (wrapper) => {
        if (!(wrapper instanceof HTMLElement)) return;
        // 过滤非结果卡片（如重新解析/刷新 tag 按钮）
        if (wrapper.dataset.rbqSdtIsResult === '0' || wrapper.dataset.rbqSdtKey?.endsWith('-reparse') || wrapper.classList.contains('rbq-sdt-reparse')) {
            return;
        }
        const prompt = wrapper.dataset.prompt || '';
        if (prompt === '[Smart Draw]') return;
        const messageId = Number(wrapper.dataset.messageId);
        const scope = buildMessageHistoryScope(messageId, prompt);
        const latestHistory = getLatestHistoryItemForScope(scope);
        const container = wrapper.querySelector('.st-scene-trigger-inline-result');
        if (!(container instanceof HTMLElement)) return;
        if (!latestHistory) {
            container.innerHTML = '';
            container.classList.remove('is-visible');
            return;
        }
        // 如果当前已经显示了有效的非空图片链接且未损坏，避免无谓重复渲染
        const existingImg = container.querySelector('img');
        if (existingImg instanceof HTMLImageElement && existingImg.src && !existingImg.src.endsWith('/undefined')) {
            if (latestHistory.cacheId && objectUrlCache.has(latestHistory.cacheId)) {
                return;
            }
            const currentSrc = existingImg.getAttribute('src') || existingImg.src;
            if (
                (latestHistory.serverPreviewUrl && currentSrc.includes(latestHistory.serverPreviewUrl)) ||
                (latestHistory.serverUrl && currentSrc.includes(latestHistory.serverUrl)) ||
                (latestHistory.url && currentSrc === latestHistory.url)
            ) {
                return;
            }
        }
        const displayUrl = await ensureHistoryItemDisplayUrl(latestHistory);
        if (displayUrl) {
            renderInlineGeneratedImage(wrapper, { ...latestHistory, url: displayUrl });
        }
    }));
}

function getHistoryItemsByPrompt(prompt) {
    const normalized = String(prompt || '').trim();
    const history = Array.isArray(getSettings().history) ? getSettings().history : [];
    const seen = new Set();
    return history
        .filter((item) => String(item.prompt || '').trim() === normalized && (item.cacheId || item.url || item.serverUrl || item.serverPreviewUrl || item.serverOriginalUrl))
        .filter((item) => {
            const key = item.cacheId || item.url || item.serverUrl || item.serverPreviewUrl || item.serverOriginalUrl;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
}

function getHistoryItemsForScope(scope) {
    const history = Array.isArray(getSettings().history) ? [...getSettings().history] : [];
    if (scope && scope.messageId != null && Number.isFinite(Number(scope.messageId))) {
        try {
            const ctx = getContext?.();
            const msg = ctx?.chat?.[scope.messageId];
            if (msg?.extra) {
                const extras = [];
                if (Array.isArray(msg.extra.rbq_images)) {
                    extras.push(...msg.extra.rbq_images);
                }
                if (msg.extra.rbq_image) {
                    extras.push(msg.extra.rbq_image);
                }
                for (const item of extras) {
                    if (item && (item.cacheId || item.url || item.serverUrl || item.serverPreviewUrl || item.serverOriginalUrl)) {
                        history.push({
                            ...item,
                            messageId: scope.messageId,
                            chatId: scope.chatId,
                            conversationKey: scope.conversationKey,
                            ownerType: scope.ownerType,
                            ownerId: scope.ownerId,
                        });
                    }
                }
            }
        } catch (e) {
            console.warn('[st-scene-trigger] Failed to load history items from message.extra:', e);
        }
    }
    const seen = new Set();
    return history
        .filter((item) => (item.cacheId || item.url || item.serverUrl || item.serverPreviewUrl || item.serverOriginalUrl) && matchesHistoryScope(item, scope))
        .filter((item) => {
            const key = item.cacheId || item.url || item.serverUrl || item.serverPreviewUrl || item.serverOriginalUrl;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
}

function applyViewerTransform(animate = false) {
    const modal = document.getElementById('st-scene-trigger-image-viewer');
    const image = modal?.querySelector('.st-scene-trigger-viewer-image');
    if (!(image instanceof HTMLElement)) return;

    if (animate) {
        image.style.transition = 'transform 0.26s cubic-bezier(0.16, 1, 0.3, 1)';
    } else {
        image.style.transition = 'none';
    }

    const { scale, x, y } = viewerZoomState;
    image.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    image.style.cursor = scale > 1.02 ? (viewerZoomState.isDragging ? 'grabbing' : 'grab') : '';

    const pill = modal?.querySelector('.st-scene-trigger-viewer-zoom-pill');
    if (pill instanceof HTMLElement) {
        pill.textContent = `${Math.round(scale * 100)}%`;
        if (Math.abs(scale - 1) > 0.03) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    }
}

function resetViewerZoom(animate = true) {
    viewerZoomState.scale = 1;
    viewerZoomState.x = 0;
    viewerZoomState.y = 0;
    viewerZoomState.isDragging = false;
    viewerZoomState.isPinching = false;
    viewerZoomState.isTouchPanning = false;
    viewerZoomState.isPullDismissing = false;
    viewerZoomState.pullDownY = 0;
    applyViewerTransform(animate);

    const modal = document.getElementById('st-scene-trigger-image-viewer');
    const backdrop = modal?.querySelector('.st-scene-trigger-image-viewer-backdrop');
    if (backdrop instanceof HTMLElement) {
        backdrop.style.opacity = '';
    }
}

function renderViewer() {
    const modal = document.getElementById('st-scene-trigger-image-viewer');
    if (!(modal instanceof HTMLElement)) return;

    if (!viewerState.open) {
        modal.classList.remove('open', 'has-thumbs');
        modal.style.display = 'none';
        // 清理手机端与各种动态内联样式，杜绝任何隐形残留层阻挡底层点击与滑动
        const shell = modal.querySelector('.st-scene-trigger-image-viewer-shell');
        const stage = modal.querySelector('.st-scene-trigger-viewer-stage');
        const thumbs = modal.querySelector('.st-scene-trigger-viewer-thumbs');
        const actions = modal.querySelector('.st-scene-trigger-viewer-actions');
        const navPrev = modal.querySelector('.st-scene-trigger-viewer-nav.prev');
        const navNext = modal.querySelector('.st-scene-trigger-viewer-nav.next');
        const image = modal.querySelector('.st-scene-trigger-viewer-image');
        const bottomBar = modal.querySelector('.st-scene-trigger-viewer-bottom-bar');
        const backdrop = modal.querySelector('.st-scene-trigger-image-viewer-backdrop');
        for (const el of [shell, stage, thumbs, actions, navPrev, navNext, image, bottomBar, backdrop]) {
            if (el instanceof HTMLElement) el.style.cssText = '';
        }
        return;
    }

    const current = viewerState.items[viewerState.index];
    if (!current) {
        modal.classList.remove('open', 'has-thumbs');
        modal.style.display = 'none';
        return;
    }

    modal.style.display = 'block';
    modal.classList.add('open');

    const image = modal.querySelector('.st-scene-trigger-viewer-image');
    const download = modal.querySelector('.st-scene-trigger-viewer-download');
    const thumbs = modal.querySelector('.st-scene-trigger-viewer-thumbs');
    const favBtn = modal.querySelector('.st-scene-trigger-viewer-favorite');

    // 关键双轨策略：
    // 1. 如果用户显式点击过查看原图 (current._originalLoaded === true)，展示 serverOriginalUrl
    // 2. 否则，如果存在轻量预览图 (serverPreviewUrl)，一律首选轻量预览图，保证跨设备秒开与省流！
    // 3. 只有当既没有本地全量缓存又没有预览图时，才兜底使用原图或现有 url
    const hasLocalFullBlob = Boolean(current.cacheId && objectUrlCache.has(current.cacheId) && !current.displayUrl?.includes('_preview.webp'));
    let activeUrl = '';
    if (current._originalLoaded) {
        activeUrl = current.serverOriginalUrl || current.displayUrl || current.url || '';
    } else if (hasLocalFullBlob) {
        activeUrl = objectUrlCache.get(current.cacheId) || current.displayUrl || current.url || '';
    } else if (current.serverPreviewUrl) {
        activeUrl = current.serverPreviewUrl;
    } else if (current.serverUrl && current.serverUrl.includes('_preview.webp')) {
        activeUrl = current.serverUrl;
    } else {
        activeUrl = current.displayUrl || current.url || '';
    }
    current.displayUrl = activeUrl;

    if (image instanceof HTMLImageElement) {
        image.src = activeUrl;
        image.alt = viewerState.prompt || current.prompt || 'generated image';
        // 如果当前项的 displayUrl 尚未恢复（例如切图切到了后台未完成项），即时异步自愈
        if (!current.displayUrl && (current.cacheId || current.url)) {
            void ensureHistoryItemDisplayUrl(current, { preferOriginal: Boolean(current._originalLoaded) }).then((resolvedUrl) => {
                if (resolvedUrl && viewerState.open && viewerState.items[viewerState.index] === current) {
                    current.displayUrl = resolvedUrl;
                    image.src = resolvedUrl;
                    if (download instanceof HTMLAnchorElement) download.href = current.serverOriginalUrl || current.serverUrl || resolvedUrl;
                }
            });
        }
    }
    if (download instanceof HTMLAnchorElement) {
        // 下载始终优先直连原始无损文件
        download.href = current.serverOriginalUrl || current.serverUrl || activeUrl;
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const timeStr = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
        const mode = current.mode || getSettings().currentMode || 'rbq';
        const filename = `rbq_${mode}_${timeStr}.png`;
        download.setAttribute('download', filename);
    }
    // ── 按需加载原图胶囊交互 ──
    const loadOrigBtn = modal.querySelector('#st-viewer-load-original-pill');
    if (loadOrigBtn instanceof HTMLElement) {
        const canLoadOriginal = Boolean(
            current.serverOriginalUrl &&
            !current._originalLoaded &&
            !hasLocalFullBlob &&
            activeUrl !== current.serverOriginalUrl
        );

        if (canLoadOriginal) {
            loadOrigBtn.style.display = 'inline-flex';
            loadOrigBtn.disabled = false;
            loadOrigBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> 查看原图';
            loadOrigBtn.onclick = async (e) => {
                e.stopPropagation();
                loadOrigBtn.disabled = true;
                loadOrigBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 正在加载原图...';
                try {
                    const originalUrl = current.serverOriginalUrl;
                    const imgLoader = new Image();
                    imgLoader.src = originalUrl;
                    await new Promise((resolve, reject) => {
                        imgLoader.onload = resolve;
                        imgLoader.onerror = reject;
                    });
                    if (viewerState.open && viewerState.items[viewerState.index] === current) {
                        current._originalLoaded = true;
                        current.displayUrl = originalUrl;
                        if (image instanceof HTMLImageElement) image.src = originalUrl;
                        loadOrigBtn.innerHTML = '<i class="fa-solid fa-check"></i> 已加载原图';
                        setTimeout(() => {
                            if (current._originalLoaded && loadOrigBtn) {
                                loadOrigBtn.style.display = 'none';
                            }
                        }, 1800);
                        // 派发更新通知 storage badge
                        window.dispatchEvent(new CustomEvent('st-scene-trigger:viewer-rendered', {
                            detail: {
                                current,
                                modal,
                                index: viewerState.index,
                                items: viewerState.items,
                                isMobile: window.innerWidth <= 900
                            }
                        }));
                        if (typeof toastr !== 'undefined' && toastr.success) {
                            toastr.success('已加载无损高清原图', DISPLAY_NAME);
                        }
                    }
                } catch (err) {
                    console.error('[st-scene-trigger] 加载原图失败:', err);
                    loadOrigBtn.disabled = false;
                    loadOrigBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> 原图加载失败，点击重试';
                    if (typeof toastr !== 'undefined' && toastr.error) {
                        toastr.error('原图加载失败，请检查网络或服务端', DISPLAY_NAME);
                    }
                }
            };
        } else {
            loadOrigBtn.style.display = 'none';
        }
    }
    if (favBtn instanceof HTMLElement) {
        const isFav = !!current.favorite;
        favBtn.innerHTML = `<i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-star"></i>`;
        favBtn.classList.toggle('active', isFav);
        favBtn.title = isFav ? '取消收藏' : '加入收藏（防清理）';
    }
    if (thumbs instanceof HTMLElement) {
        const hasThumbs = viewerState.items.length > 1;
        modal.classList.toggle('has-thumbs', hasThumbs);
        if (!hasThumbs) {
            thumbs.style.display = 'none';
            thumbs.innerHTML = '';
        } else {
            thumbs.style.display = 'flex';
            thumbs.innerHTML = viewerState.items.map((item, index) => {
                // 防止 undefined 变成字面量字符串 "undefined" 或者 "blob:.../undefined"
                let src = item.thumbnailUrl || item.displayUrl || item.url || '';
                if (String(src).trim() === 'undefined' || String(src).endsWith('/undefined')) {
                    src = '';
                }
                return `
              <button class="st-scene-trigger-viewer-thumb ${index === viewerState.index ? 'active' : ''}" data-index="${index}" type="button">
                <img src="${src}" alt="history ${index + 1}">
                ${item.favorite ? '<span class="st-scene-trigger-thumb-fav-star"><i class="fa-solid fa-star"></i></span>' : ''}
              </button>
            `;
            }).join('');

            // 自动平滑滚动当前选中的缩略图至视野中央
            const activeThumb = thumbs.querySelector('.st-scene-trigger-viewer-thumb.active');
            if (activeThumb instanceof HTMLElement) {
                activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        }
    }

    // 重新应用缩放状态以保证 transform 存在
    applyViewerTransform(false);

    window.dispatchEvent(new CustomEvent('st-scene-trigger:viewer-rendered', {
        detail: {
            current,
            modal,
            bottomBar: modal.querySelector('.st-scene-trigger-viewer-bottom-bar'),
            index: viewerState.index,
            items: viewerState.items,
            isMobile: window.innerWidth <= 900
        }
    }));
}

function updateViewerCurrentItem(imageResult, updatedPrompt) {
    const current = viewerState.items[viewerState.index];
    if (current && imageResult) {
        if (imageResult.url) current.url = imageResult.url;
        if (imageResult.displayUrl) current.displayUrl = imageResult.displayUrl;
        if (imageResult.thumbnailUrl) current.thumbnailUrl = imageResult.thumbnailUrl;
        if (imageResult.cacheId) current.cacheId = imageResult.cacheId;
        if (updatedPrompt) {
            current.prompt = updatedPrompt;
            viewerState.prompt = updatedPrompt;
        }
        renderViewer();
    }
}

async function openImageViewer(prompt, currentUrl, meta = {}) {
    mountImageViewer();
    try {
        let items;
        if (meta.fromHistory) {
            // 从图库/历史记录中点开大图：载入当前筛选的所有历史记录，支持左右切图与底部缩略图联动
            const all = getFilteredHistoryItems();
            items = all.length ? [...all] : [];
        } else {
            const scope = buildMessageHistoryScope(meta.messageId, prompt);
            items = scope.messageId != null ? getHistoryItemsForScope(scope) : getHistoryItemsByPrompt(prompt);
        }
        if (!items.length && meta.cacheId) {
            const found = getHistoryItems().find((item) => item.cacheId === meta.cacheId);
            if (found) items = [found];
        }
        if (!items.length && (currentUrl || prompt)) {
            items.push({
                url: currentUrl || '',
                prompt: prompt || '',
                displayUrl: currentUrl || '',
                cacheId: meta.cacheId || '',
                messageId: meta.messageId != null ? meta.messageId : null,
                chatId: getConversationContext()?.chatId || null,
                conversationKey: getConversationContext()?.conversationKey || null,
            });
        }
        if (!items.length) return;

        // 定位目标图片索引
        let targetIndex = -1;
        if (meta.cacheId) {
            targetIndex = items.findIndex((item) => item.cacheId === meta.cacheId);
        }
        if (targetIndex < 0 && currentUrl) {
            targetIndex = items.findIndex((item) => item.displayUrl === currentUrl || item.url === currentUrl || item.serverPreviewUrl === currentUrl || item.serverOriginalUrl === currentUrl || item.serverUrl === currentUrl);
        }
        if (targetIndex < 0 && meta.messageId != null) {
            targetIndex = items.findIndex((item) => item.messageId === meta.messageId);
        }
        if (targetIndex < 0) {
            targetIndex = 0;
        }

        const targetItem = items[targetIndex];
        if (targetItem) {
            try {
                const resolved = await ensureHistoryItemDisplayUrl(targetItem, { preferOriginal: Boolean(targetItem._originalLoaded) });
                if (resolved) targetItem.displayUrl = resolved;
            } catch (e) {
                console.warn('[RBQ] 目标图片解析 displayUrl 异常:', e);
                if (!targetItem.displayUrl) {
                    targetItem.displayUrl = currentUrl || targetItem.url || '';
                }
            }
        }

        viewerState.prompt = String(prompt || targetItem?.prompt || '');
        viewerState.items = items;
        viewerState.index = targetIndex;

        // 如果控制台当前正打开着，先隐形隐藏它，防止遮挡或透过半透明背景干扰大图浏览
        const modal = document.getElementById('st-scene-trigger-modal');
        if (modal && (modal.classList.contains('open') || modalOpen)) {
            viewerState.modalWasOpen = true;
            const content = modal.querySelector('.st-scene-trigger-modal-content');
            viewerState.savedScrollTop = content ? content.scrollTop : 0;
            modal.style.display = 'none';
        } else {
            viewerState.modalWasOpen = false;
            viewerState.savedScrollTop = null;
        }

        resetViewerZoom(false);
        viewerState.open = true;
        renderViewer();

        // 异步后台平滑恢复其他缩略图，绝不阻塞主查看器渲染
        void (async () => {
            for (let i = 0; i < items.length; i++) {
                if (i === targetIndex) continue;
                const it = items[i];
                if (!it) continue;
                if (!it.thumbnailUrl && (it.cacheId || it.url)) {
                    try {
                        await ensureHistoryItemThumbnailUrl(it);
                    } catch (_) {}
                }
            }
        })();
    } catch (err) {
        console.error(`[${EXTENSION_NAME}] openImageViewer 错误:`, err);
        if (typeof toastr !== 'undefined' && toastr.error) {
            toastr.error(`[RBQ] 打开大图查看器失败: ${err?.message || err}`);
        }
    }
}

function closeImageViewer() {
    resetViewerZoom(false);
    viewerState.open = false;
    viewerZoomState.isPullDismissing = false;
    viewerZoomState.pullDownY = 0;
    viewerZoomState.isDragging = false;
    viewerZoomState.isPinching = false;
    viewerZoomState.isTouchPanning = false;
    renderViewer();
    try {
        window.dispatchEvent(new CustomEvent('st-scene-trigger:viewer-closed'));
    } catch (_) {}
    // 如果之前是从控制台点开的大图，关闭后平滑恢复控制台
    if (viewerState.modalWasOpen) {
        viewerState.modalWasOpen = false;
        const modal = document.getElementById('st-scene-trigger-modal');
        if (modal) {
            modal.style.display = '';
            if (viewerState.savedScrollTop != null) {
                const content = modal.querySelector('.st-scene-trigger-modal-content');
                if (content) content.scrollTop = viewerState.savedScrollTop;
            }
        }
    }
}

async function shiftViewer(step) {
    if (!viewerState.items.length) return;
    resetViewerZoom(false);
    viewerState.index = (viewerState.index + step + viewerState.items.length) % viewerState.items.length;
    const current = viewerState.items[viewerState.index];
    if (current && !current.displayUrl && (current.cacheId || current.url)) {
        try {
            current.displayUrl = await ensureHistoryItemDisplayUrl(current, { preferOriginal: Boolean(current._originalLoaded) });
        } catch (_) {}
    }
    renderViewer();
}

function mountImageViewer() {
    if (document.getElementById('st-scene-trigger-image-viewer')) return;
    document.body.insertAdjacentHTML('beforeend', `
      <div id="st-scene-trigger-image-viewer" class="st-scene-trigger-image-viewer">
        <div class="st-scene-trigger-image-viewer-backdrop"></div>
        <div class="st-scene-trigger-image-viewer-shell">
          <div class="st-scene-trigger-viewer-thumbs"></div>
          <button class="st-scene-trigger-viewer-nav prev" type="button" data-action="prev"><i class="fa-solid fa-chevron-left"></i></button>
          <div class="st-scene-trigger-viewer-stage">
            <img class="st-scene-trigger-viewer-image" src="" alt="generated image">
          </div>
          <button class="st-scene-trigger-viewer-nav next" type="button" data-action="next"><i class="fa-solid fa-chevron-right"></i></button>
          <div class="st-scene-trigger-viewer-actions">
            <button class="st-scene-trigger-viewer-zoom-pill menu_button" type="button" title="点击复位缩放">100%</button>
            <button class="st-scene-trigger-viewer-favorite menu_button" type="button" title="收藏/取消收藏"><i class="fa-regular fa-star"></i></button>
            <button class="st-scene-trigger-viewer-delete menu_button" type="button" title="删除记录"><i class="fa-solid fa-trash-can"></i></button>
            <a class="st-scene-trigger-viewer-download menu_button" href="" target="_blank" rel="noopener noreferrer" title="下载原图">
              <i class="fa-solid fa-download"></i>
            </a>
            <button class="st-scene-trigger-viewer-close menu_button" type="button" title="关闭 (ESC)">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div id="st-viewer-load-original-container" class="st-scene-trigger-viewer-load-original-container">
            <button id="st-viewer-load-original-pill" class="st-scene-trigger-load-original-pill menu_button" type="button" style="display: none;">
              <i class="fa-solid fa-cloud-arrow-down"></i> 查看原图
            </button>
          </div>
          <div class="st-scene-trigger-viewer-bottom-bar"></div>
        </div>
      </div>
    `);

    const modal = document.getElementById('st-scene-trigger-image-viewer');
    const backdrop = modal?.querySelector('.st-scene-trigger-image-viewer-backdrop');
    const shell = modal?.querySelector('.st-scene-trigger-image-viewer-shell');
    const stage = modal?.querySelector('.st-scene-trigger-viewer-stage');

    const handleBackgroundClick = (event) => {
        if (viewerZoomState.hasMoved) return;
        if (viewerZoomState.scale > 1.05) {
            resetViewerZoom(true);
            return;
        }
        if (event.target === event.currentTarget) {
            closeImageViewer();
        }
    };

    backdrop?.addEventListener('click', closeImageViewer);
    shell?.addEventListener('click', handleBackgroundClick);
    stage?.addEventListener('click', handleBackgroundClick);

    modal?.querySelector('.st-scene-trigger-viewer-close')?.addEventListener('click', closeImageViewer);
    modal?.querySelector('.st-scene-trigger-viewer-zoom-pill')?.addEventListener('click', () => resetViewerZoom(true));

    modal?.querySelector('.st-scene-trigger-viewer-favorite')?.addEventListener('click', () => {
        const current = viewerState.items[viewerState.index];
        if (current) toggleHistoryFavorite(current.cacheId || current.url);
    });

    modal?.querySelector('.st-scene-trigger-viewer-delete')?.addEventListener('click', () => {
        const current = viewerState.items[viewerState.index];
        if (current && confirm('确定删除此生图记录并清除本地缓存吗？')) {
            void deleteHistoryItem(current.cacheId || current.url, true);
        }
    });

    modal?.querySelector('[data-action="prev"]')?.addEventListener('click', () => shiftViewer(-1));
    modal?.querySelector('[data-action="next"]')?.addEventListener('click', () => shiftViewer(1));
    const thumbsContainer = modal?.querySelector('.st-scene-trigger-viewer-thumbs');
    thumbsContainer?.addEventListener('click', async (event) => {
        const button = event.target.closest('.st-scene-trigger-viewer-thumb');
        if (!(button instanceof HTMLButtonElement)) return;
        viewerState.index = Number(button.dataset.index || 0);
        resetViewerZoom(false);
        const current = viewerState.items[viewerState.index];
        if (current && !current.displayUrl && (current.cacheId || current.url)) {
            try {
                current.displayUrl = await ensureHistoryItemDisplayUrl(current);
            } catch (_) {}
        }
        renderViewer();
    });
    // 鼠标在缩略图上滚轮时，横向平滑滚动缩略图列表
    thumbsContainer?.addEventListener('wheel', (event) => {
        if (event.deltaY !== 0) {
            event.preventDefault();
            thumbsContainer.scrollLeft += event.deltaY;
        }
    }, { passive: false });

    // 鼠标或触控板在底栏滚轮时，横向平滑滚动底栏，且不冒泡至查看器
    const viewerBottomBar = modal?.querySelector('.st-scene-trigger-viewer-bottom-bar');
    viewerBottomBar?.addEventListener('wheel', (event) => {
        if (event.deltaY !== 0 || event.deltaX !== 0) {
            event.preventDefault();
            event.stopPropagation();
            viewerBottomBar.scrollLeft += (event.deltaX || event.deltaY);
        }
    }, { passive: false });

    // ── 电脑端交互：鼠标滚轮光标定点缩放 ──
    stage?.addEventListener('wheel', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const image = modal?.querySelector('.st-scene-trigger-viewer-image');
        if (!(image instanceof HTMLImageElement)) return;

        const zoomFactor = event.deltaY < 0 ? 1.18 : 0.85;
        let nextScale = viewerZoomState.scale * zoomFactor;
        if (nextScale < 0.75) nextScale = 0.75;
        if (nextScale > 6.0) nextScale = 6.0;

        if (Math.abs(nextScale - 1) < 0.05) {
            nextScale = 1;
        }

        if (nextScale === 1) {
            viewerZoomState.scale = 1;
            viewerZoomState.x = 0;
            viewerZoomState.y = 0;
        } else {
            const rect = image.getBoundingClientRect();
            const mouseX = event.clientX - (rect.left + rect.width / 2);
            const mouseY = event.clientY - (rect.top + rect.height / 2);
            const ratio = nextScale / viewerZoomState.scale - 1;
            viewerZoomState.x -= mouseX * ratio;
            viewerZoomState.y -= mouseY * ratio;
            viewerZoomState.scale = nextScale;
        }
        applyViewerTransform(false);
    }, { passive: false });

    // ── 电脑端交互：鼠标拖拽平移 (Pan) ──
    stage?.addEventListener('mousedown', (event) => {
        if (event.button !== 0) return;
        if (viewerZoomState.scale <= 1.02) return;
        event.preventDefault();
        viewerZoomState.isDragging = true;
        viewerZoomState.hasMoved = false;
        viewerZoomState.startX = event.clientX - viewerZoomState.x;
        viewerZoomState.startY = event.clientY - viewerZoomState.y;
        applyViewerTransform(false);
    });

    window.addEventListener('mousemove', (event) => {
        if (!viewerZoomState.isDragging) return;
        event.preventDefault();
        const newX = event.clientX - viewerZoomState.startX;
        const newY = event.clientY - viewerZoomState.startY;
        if (Math.abs(newX - viewerZoomState.x) > 3 || Math.abs(newY - viewerZoomState.y) > 3) {
            viewerZoomState.hasMoved = true;
        }
        viewerZoomState.x = newX;
        viewerZoomState.y = newY;
        applyViewerTransform(false);
    });

    window.addEventListener('mouseup', () => {
        if (viewerZoomState.isDragging) {
            viewerZoomState.isDragging = false;
            applyViewerTransform(false);
            setTimeout(() => {
                viewerZoomState.hasMoved = false;
            }, 80);
        }
    });

    // ── 电脑端交互：双击快速放大 / 复位 ──
    stage?.addEventListener('dblclick', (event) => {
        const image = modal?.querySelector('.st-scene-trigger-viewer-image');
        if (!(image instanceof HTMLImageElement)) return;
        event.preventDefault();
        event.stopPropagation();
        if (viewerZoomState.scale > 1.05) {
            resetViewerZoom(true);
        } else {
            const rect = image.getBoundingClientRect();
            const mouseX = event.clientX - (rect.left + rect.width / 2);
            const mouseY = event.clientY - (rect.top + rect.height / 2);
            viewerZoomState.scale = 2.5;
            viewerZoomState.x = -mouseX * (2.5 - 1);
            viewerZoomState.y = -mouseY * (2.5 - 1);
            applyViewerTransform(true);
        }
    });

    // ── 键盘辅助快捷键：ESC 复位/退出，左右方向键切图 ──
    window.addEventListener('keydown', (event) => {
        if (!viewerState.open) return;
        if (event.key === 'Escape') {
            event.preventDefault();
            if (viewerZoomState.scale > 1.05) {
                resetViewerZoom(true);
            } else {
                closeImageViewer();
            }
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            shiftViewer(-1);
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            shiftViewer(1);
        }
    });

    // ── 手机端手势交互：双指捏合缩放、双击放大、单指平移、下滑退出、水平划动切图 ──
    let touchStartX = 0;
    let touchStartY = 0;
    let isInteractiveTouch = false;

    if (shell) {
        shell.addEventListener('touchstart', (event) => {
            const target = event.target;
            if (target instanceof Element && target.closest('.st-scene-trigger-viewer-bottom-bar, .st-scene-trigger-viewer-actions, .st-scene-trigger-viewer-thumbs, .st-scene-trigger-viewer-nav, .rbq-storage-modal-dialog, .rbq-storage-modal-overlay, button, a, input, select')) {
                isInteractiveTouch = true;
                return;
            }
            isInteractiveTouch = false;

            if (event.touches.length === 2) {
                viewerZoomState.isPinching = true;
                viewerZoomState.pinchStartDist = Math.hypot(
                    event.touches[0].clientX - event.touches[1].clientX,
                    event.touches[0].clientY - event.touches[1].clientY
                );
                viewerZoomState.pinchStartScale = viewerZoomState.scale;
                return;
            }

            if (event.touches.length === 1) {
                const touch = event.touches[0];
                const now = Date.now();
                // 双击检测
                if (now - viewerZoomState.lastTapTime < 300) {
                    event.preventDefault();
                    const image = modal?.querySelector('.st-scene-trigger-viewer-image');
                    if (image instanceof HTMLElement) {
                        if (viewerZoomState.scale > 1.05) {
                            resetViewerZoom(true);
                        } else {
                            const rect = image.getBoundingClientRect();
                            const touchX = touch.clientX - (rect.left + rect.width / 2);
                            const touchY = touch.clientY - (rect.top + rect.height / 2);
                            viewerZoomState.scale = 2.5;
                            viewerZoomState.x = -touchX * 1.5;
                            viewerZoomState.y = -touchY * 1.5;
                            applyViewerTransform(true);
                        }
                    }
                    viewerZoomState.lastTapTime = 0;
                    return;
                }
                viewerZoomState.lastTapTime = now;

                touchStartX = touch.clientX;
                touchStartY = touch.clientY;

                if (viewerZoomState.scale > 1.02) {
                    viewerZoomState.isTouchPanning = true;
                    viewerZoomState.startX = touch.clientX - viewerZoomState.x;
                    viewerZoomState.startY = touch.clientY - viewerZoomState.y;
                } else {
                    viewerZoomState.isTouchPanning = false;
                    viewerZoomState.isPullDismissing = false;
                }
            }
        }, { passive: false });

        shell.addEventListener('touchmove', (event) => {
            if (isInteractiveTouch) return;

            if (viewerZoomState.isPinching && event.touches.length === 2) {
                event.preventDefault();
                const dist = Math.hypot(
                    event.touches[0].clientX - event.touches[1].clientX,
                    event.touches[0].clientY - event.touches[1].clientY
                );
                const factor = dist / (viewerZoomState.pinchStartDist || 1);
                let newScale = viewerZoomState.pinchStartScale * factor;
                if (newScale < 0.7) newScale = 0.7;
                if (newScale > 6.0) newScale = 6.0;
                viewerZoomState.scale = newScale;
                applyViewerTransform(false);
                return;
            }

            if (viewerZoomState.isTouchPanning && event.touches.length === 1) {
                event.preventDefault();
                viewerZoomState.x = event.touches[0].clientX - viewerZoomState.startX;
                viewerZoomState.y = event.touches[0].clientY - viewerZoomState.startY;
                applyViewerTransform(false);
                return;
            }

            if (viewerZoomState.scale <= 1.02 && event.touches.length === 1) {
                const touch = event.touches[0];
                const dx = touch.clientX - touchStartX;
                const dy = touch.clientY - touchStartY;

                // 下滑退出手势检测：向下移动且纵向占主导
                if (dy > 15 && dy > Math.abs(dx) * 1.3) {
                    event.preventDefault();
                    viewerZoomState.isPullDismissing = true;
                    viewerZoomState.pullDownY = dy;
                    const image = modal?.querySelector('.st-scene-trigger-viewer-image');
                    const backdropEl = modal?.querySelector('.st-scene-trigger-image-viewer-backdrop');
                    if (image instanceof HTMLElement) {
                        const pullScale = Math.max(0.75, 1 - dy / 1000);
                        image.style.transition = 'none';
                        image.style.transform = `translate3d(0, ${dy}px, 0) scale(${pullScale})`;
                    }
                    if (backdropEl instanceof HTMLElement) {
                        backdropEl.style.opacity = String(Math.max(0.2, 1 - dy / 380));
                    }
                }
            }
        }, { passive: false });

        shell.addEventListener('touchend', (event) => {
            if (isInteractiveTouch) {
                isInteractiveTouch = false;
                return;
            }

            if (viewerZoomState.isPinching) {
                viewerZoomState.isPinching = false;
                if (viewerZoomState.scale < 1) {
                    resetViewerZoom(true);
                } else if (viewerZoomState.scale > 5.0) {
                    viewerZoomState.scale = 5.0;
                    applyViewerTransform(true);
                }
                return;
            }

            if (viewerZoomState.isTouchPanning) {
                viewerZoomState.isTouchPanning = false;
                return;
            }

            if (viewerZoomState.isPullDismissing) {
                const dy = viewerZoomState.pullDownY;
                viewerZoomState.isPullDismissing = false;
                viewerZoomState.pullDownY = 0;
                if (dy > 95) {
                    closeImageViewer();
                } else {
                    resetViewerZoom(true);
                }
                return;
            }

            if (viewerZoomState.scale <= 1.02 && event.changedTouches.length) {
                const dx = event.changedTouches[0].clientX - touchStartX;
                const dy = event.changedTouches[0].clientY - touchStartY;
                if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                    shiftViewer(dx < 0 ? 1 : -1);
                }
            }
        });

        shell.addEventListener('touchcancel', () => {
            isInteractiveTouch = false;
            viewerZoomState.isPinching = false;
            viewerZoomState.isTouchPanning = false;
            viewerZoomState.isPullDismissing = false;
            viewerZoomState.pullDownY = 0;
            resetViewerZoom(true);
        });
    }
}

async function processMessage(messageId, options = {}) {
    const { allowAutoGenerate = true, force = false, _streamRetry = 0 } = options;
    const message = getContext()?.chat?.[messageId];
    if (!shouldHandleMessage(message)) {
        return;
    }

    // 流式输出期间判断是否触发静默自动生图
    // 之前这里限制了 messageId === chatLen - 1，导致测试旧楼层或滑动时，流式保护失效而狂闪！
    const streaming = isStreamingActive();
    const prompts = extractPrompts(message?.mes);

    // 能否在流式中触发自动生图（有完整提示词即可）
    // 放宽限制：流式时只要有完整的 tag 就允许进入后续流程触发，但不渲染 DOM
    const allowStreamAuto = streaming && getSettings().autoGenerate && prompts.length > 0;

    if (streaming && !allowStreamAuto) {
        // 还没凑出提示词的流式期 -> 保持静默防闪烁
        return;
    }

    const chatLen = getContext()?.chat?.length ?? 0;
    // 仅针对当前正在流式输出的最后一条消息禁用 DOM 渲染以防闪烁。历史消息是静态的，可正常渲染
    const isThisMessageStreaming = streaming && messageId === chatLen - 1;

    if (!isThisMessageStreaming) {
        const messageElement = document.querySelector(`.mes[mesid="${messageId}"]`);
        if (messageElement instanceof HTMLElement) {
            messageVisibilityObserver?.unobserve(messageElement);
            if (force) {
                const anchor = getMessageTextContainer(messageElement);
                if (anchor instanceof HTMLElement) {
                    delete anchor.dataset.stSceneSignature;
                }
            }
        }

        console.log('[RBQ-dbg] #' + messageId + ' force=' + force + ' prompts=' + prompts.length + ' mesLen=' + (message?.mes?.length ?? 0));
        if (prompts.length) {
            renderMessageCards(messageId, prompts);
        }
    }


    if (!prompts.length) return;
    if (!allowAutoGenerate || !getSettings().autoGenerate) return;

    // ----- 防止瞎出图的核心防线 -----
    // 防线 1：流式触发期间允许接客，非流式时（如重载/初始化）只允许针对最新楼层，防止历史暴走
    const isLatestFloor = messageId === chatLen - 1;
    if (!streaming && !isLatestFloor) return;

    const conversationKey = getConversationContext().conversationKey || 'default';
    for (const item of prompts) {
        const autoKey = `${conversationKey}:${messageId}:${item.id}`;
        if (autoKeys.has(autoKey)) continue;

        // 防线 2：历史查重。如果曾为这条消息的这串代码生过图，绝对不再重复生（防非流式/刷新后重叠）
        const scope = buildMessageHistoryScope(messageId, item.prompt);
        if (getLatestHistoryItemForScope(scope)) {
            autoKeys.add(autoKey); // 防止当次由于其他原因导致的重复扫描
            continue;
        }

        autoKeys.add(autoKey);

        if (streaming) {
            toastr.info('画面灵感已捕捉，正在后台并发生成...', DISPLAY_NAME);
        }

        try {
            const getTarget = () => {
                const mesEl = document.querySelector(`.mes[mesid="${messageId}"]`);
                if (!mesEl) return null;
                const wrappers = [...(mesEl.querySelectorAll('.st-scene-trigger-inline-wrap') || [])];
                return wrappers.find((element) => element.dataset.promptId === item.id);
            };

            const isNaiMode = getSettings().currentMode === 'nai';
            let initialTarget = getTarget();
            if (initialTarget) {
                const btn = initialTarget.querySelector('.st-scene-trigger-generate');
                const loader = initialTarget.querySelector('.st-scene-trigger-inline-loader');
                if (btn && isNaiMode && loader != null) {
                    btn.style.display = 'none';
                    const spinner = loader.querySelector('.st-scene-trigger-nai-spinner');
                    if (spinner) { spinner.style.animation = 'none'; void spinner.offsetHeight; spinner.style.animation = ''; }
                    loader.style.display = 'flex';
                } else if (btn) {
                    btn.classList.add('loading');
                    btn.textContent = '生成中...';
                }
            }

            const result = await generateImage(item.prompt, 'auto', { messageId }, (progressText) => {
                const liveTarget = getTarget();
                if (liveTarget && isNaiMode) {
                    const subText = liveTarget.querySelector('.st-scene-trigger-nai-loader-sub');
                    if (subText != null) subText.textContent = progressText;
                    // 如果流式刚刚结束重新渲染了按钮，需要强制隐藏按钮并显示 loader
                    const btn = liveTarget.querySelector('.st-scene-trigger-generate');
                    const loader = liveTarget.querySelector('.st-scene-trigger-inline-loader');
                    if (btn && loader) {
                        btn.style.display = 'none';
                        loader.style.display = 'flex';
                    }
                } else if (liveTarget) {
                    const btn = liveTarget.querySelector('.st-scene-trigger-generate');
                    if (btn && !btn.classList.contains('loading')) {
                        btn.classList.add('loading');
                        btn.textContent = '生成中...';
                    }
                }
            });

            const finalTarget = getTarget();
            if (finalTarget) {
                const loader = finalTarget.querySelector('.st-scene-trigger-inline-loader');
                const btn = finalTarget.querySelector('.st-scene-trigger-generate');
                if (isNaiMode && loader != null) {
                    loader.style.display = 'none';
                }
                if (btn) {
                    btn.classList.remove('loading');
                    btn.textContent = '生成图片';
                    btn.style.display = 'inline-block';
                }
                renderInlineGeneratedImage(finalTarget, result);
            }
        } catch (error) {
            toastr.error(error.message || String(error), DISPLAY_NAME);
            const failTarget = getTarget();
            if (failTarget) {
                const loader = failTarget.querySelector('.st-scene-trigger-inline-loader');
                const btn = failTarget.querySelector('.st-scene-trigger-generate');
                if (loader) loader.style.display = 'none';
                if (btn) {
                    btn.classList.remove('loading');
                    btn.textContent = '生成图片';
                    btn.style.display = 'inline-block';
                }
            }
            if (getSettings().currentMode === 'comfyui') break;
        }
    }
}

function clampPosition(x, y) {
    const size = 56;
    return {
        x: Math.min(Math.max(8, x), window.innerWidth - size - 8),
        y: Math.min(Math.max(8, y), window.innerHeight - size - 8),
    };
}

function updateFloatingMenuPosition() {
    const button = document.getElementById('st-scene-trigger-floating-toggle');
    const menu = document.getElementById('st-scene-trigger-floating-menu');
    if (!button || !menu) return;

    const rect = button.getBoundingClientRect();
    const menuWidth = menu.offsetWidth || 220;
    const menuHeight = menu.offsetHeight || 260;
    const gap = 12;
    const pad = 8;

    // Horizontal: prefer right of button, fallback to left
    let left = rect.right + gap;
    if (left + menuWidth > window.innerWidth - pad) {
        left = rect.left - menuWidth - gap;
    }
    left = Math.max(pad, Math.min(left, window.innerWidth - menuWidth - pad));

    // Vertical: center on button, then clamp to viewport
    let top = rect.top + rect.height / 2 - menuHeight / 2;
    top = Math.max(pad, Math.min(top, window.innerHeight - menuHeight - pad));

    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
    menu.style.bottom = 'auto';
    menu.style.transform = 'scale(1)';
}

function applyFloatingButtonPosition(x, y) {
    const button = document.getElementById('st-scene-trigger-floating-toggle');
    if (!button) return;

    const pos = clampPosition(x, y);
    button.style.left = `${pos.x}px`;
    button.style.top = `${pos.y}px`;
    button.style.transform = 'none';

    const settings = getSettings();
    settings.floatingButtonX = pos.x;
    settings.floatingButtonY = pos.y;
    updateFloatingMenuPosition();
}

function initFloatingButtonPosition() {
    const settings = getSettings();
    if (Number.isFinite(settings.floatingButtonX) && Number.isFinite(settings.floatingButtonY)) {
        applyFloatingButtonPosition(Number(settings.floatingButtonX), Number(settings.floatingButtonY));
        return;
    }
    applyFloatingButtonPosition(18, Math.round((window.innerHeight - 56) / 2));
}

function setFloatingOpen(open) {
    floatingOpen = Boolean(open);
    document.getElementById('st-scene-trigger-floating-menu')?.classList.toggle('open', floatingOpen);
    updateFloatingMenuPosition();
}

function setModalOpen(open) {
    modalOpen = Boolean(open);
    document.getElementById('st-scene-trigger-modal')?.classList.toggle('open', modalOpen);
    document.body.classList.toggle('st-scene-trigger-modal-open', modalOpen);
    if (modalOpen) {
        if (!document.querySelector('.cw-modal-mask')) {
            document.body.classList.remove('cw-submodal-open');
        }
        const modalShell = document.querySelector('.st-scene-trigger-modal-shell');
        if (modalShell instanceof HTMLElement) {
            modalShell.scrollTop = 0;
            modalShell.scrollLeft = 0;
        }
        const modalMain = document.querySelector('.st-scene-trigger-modal-main');
        if (modalMain instanceof HTMLElement) {
            modalMain.scrollTop = 0;
            modalMain.scrollLeft = 0;
        }
        mountModal();
        repopulateModeSelect();
        repopulateGlobalProfileSelect();
        window.setTimeout(() => updateDebugOverlay('modal-open'), 0);
    }
}

function repopulateModeSelect() {
    const select = document.getElementById('st-scene-trigger-current-mode');
    if (!select || !(select instanceof HTMLSelectElement)) return;

    const settings = getSettings();
    const currentVal = settings.currentMode || 'comfyui';

    // Clear and add built-in modes
    select.innerHTML = `
        <option value="comfyui">ComfyUI</option>
        <option value="nai">NAI</option>
    `;

    // Add plugin-registered modes
    PLUGIN_MODES.forEach((config, id) => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = config.meta.title || id;
        select.appendChild(option);
    });

    select.value = currentVal;
    updateModeUi();
}

function switchTab(tab) {
    document.querySelectorAll('[data-kite-tab]').forEach((element) => {
        element.classList.toggle('active', element.dataset.kiteTab === tab);
    });
    document.querySelectorAll('[data-kite-panel]').forEach((element) => {
        element.classList.toggle('active', element.dataset.kitePanel === tab);
    });
    const modalShell = document.querySelector('.st-scene-trigger-modal-shell');
    if (modalShell instanceof HTMLElement) {
        modalShell.scrollTop = 0;
        modalShell.scrollLeft = 0;
    }
    const modalMain = document.querySelector('.st-scene-trigger-modal-main');
    if (modalMain instanceof HTMLElement) {
        modalMain.scrollTop = 0;
        modalMain.scrollLeft = 0;
    }
    const content = document.querySelector('.st-scene-trigger-modal-content');
    if (content instanceof HTMLElement) {
        content.scrollTop = 0;
        content.scrollLeft = 0;
    }
    const activePanel = document.querySelector(`[data-kite-panel="${tab}"]`);
    if (activePanel instanceof HTMLElement) {
        activePanel.scrollTop = 0;
        activePanel.scrollLeft = 0;
    }
    const activeButton = document.querySelector(`[data-kite-tab="${tab}"]`);
    if (activeButton instanceof HTMLElement) {
        const railViewport = activeButton.closest('.st-scene-trigger-tab-rail-viewport');
        if (railViewport instanceof HTMLElement && railViewport.scrollWidth > railViewport.clientWidth) {
            const bLeft = activeButton.offsetLeft;
            const bWidth = activeButton.offsetWidth;
            const vScroll = railViewport.scrollLeft;
            const vWidth = railViewport.clientWidth;
            if (bLeft < vScroll) {
                railViewport.scrollTo({ left: bLeft, behavior: 'smooth' });
            } else if (bLeft + bWidth > vScroll + vWidth) {
                railViewport.scrollTo({ left: bLeft + bWidth - vWidth, behavior: 'smooth' });
            }
        }
        const sidebar = activeButton.closest('.st-scene-trigger-modal-sidebar');
        if (sidebar instanceof HTMLElement && sidebar.scrollHeight > sidebar.clientHeight) {
            const bTop = activeButton.offsetTop;
            const bHeight = activeButton.offsetHeight;
            const sScroll = sidebar.scrollTop;
            const sHeight = sidebar.clientHeight;
            if (bTop < sScroll) {
                sidebar.scrollTo({ top: bTop, behavior: 'smooth' });
            } else if (bTop + bHeight > sScroll + sHeight) {
                sidebar.scrollTo({ top: bTop + bHeight - sHeight, behavior: 'smooth' });
            }
        }
    }
    if (tab === 'history') {
        void renderHistory();
    }
    if (tab === 'test') {
        const testLlmBtn = document.getElementById('st-scene-trigger-test-llm');
        if (testLlmBtn) {
            testLlmBtn.style.display = typeof window.RBQ?.api?.generateWithTagger === 'function' ? 'inline-block' : 'none';
        }
    }
    updateDebugOverlay(`switch-tab:${tab}`);
    document.dispatchEvent(new CustomEvent('rbq-tab-switched', { detail: { tab } }));
}

function makeFloatingDraggable() {
    const button = document.getElementById('st-scene-trigger-floating-toggle');
    if (!button) return;

    let startX = 0;
    let startY = 0;
    let originX = 0;
    let originY = 0;
    let moved = false;

    const getPoint = (event) => ('touches' in event && event.touches[0])
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
        : { x: event.clientX, y: event.clientY };

    const onMove = (event) => {
        if (!isDraggingFloating) return;
        const point = getPoint(event);
        if (Math.abs(point.x - startX) > 3 || Math.abs(point.y - startY) > 3) {
            moved = true;
            setFloatingOpen(false);
        }
        applyFloatingButtonPosition(originX + (point.x - startX), originY + (point.y - startY));
    };

    const onEnd = () => {
        if (!isDraggingFloating) return;
        isDraggingFloating = false;
        if (moved) {
            suppressFloatingClick = true;
            window.setTimeout(() => { suppressFloatingClick = false; }, 120);
        }
        saveSettingsDebounced();
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onEnd);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('touchend', onEnd);
    };

    const onStart = (event) => {
        const point = getPoint(event);
        const rect = button.getBoundingClientRect();
        isDraggingFloating = true;
        moved = false;
        startX = point.x;
        startY = point.y;
        originX = rect.left;
        originY = rect.top;
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onEnd);
        window.addEventListener('touchmove', onMove, { passive: true });
        window.addEventListener('touchend', onEnd);
    };

    button.addEventListener('mousedown', onStart);
    button.addEventListener('touchstart', onStart, { passive: true });
}

function mountFloatingUi() {
    if (document.getElementById('st-scene-trigger-floating-toggle')) return;

    document.body.insertAdjacentHTML('beforeend', `
      <button id="st-scene-trigger-floating-toggle" class="st-scene-trigger-floating-toggle" type="button" title="${DISPLAY_NAME}">
        <span class="st-scene-trigger-kite-icon">
          <span class="st-scene-trigger-kite-core"></span>
          <span class="st-scene-trigger-kite-ring"></span>
          <span class="st-scene-trigger-kite-tail"></span>
        </span>
      </button>
      <div id="st-scene-trigger-floating-menu" class="st-scene-trigger-floating-menu">
        <button class="st-scene-trigger-floating-item" data-action="quick"><i class="fa-solid fa-wand-magic-sparkles"></i><span>快速生成</span></button>
        <button class="st-scene-trigger-floating-item" data-action="settings"><i class="fa-solid fa-gear"></i><span>插件设置</span></button>
        <div class="st-scene-trigger-floating-divider"></div>
        <button class="st-scene-trigger-floating-item danger" data-action="hide"><i class="fa-solid fa-xmark"></i><span>不再显示悬浮球</span></button>
      </div>
    `);

    const button = document.getElementById('st-scene-trigger-floating-toggle');
    const menu = document.getElementById('st-scene-trigger-floating-menu');

    button?.addEventListener('click', (event) => {
        if (isDraggingFloating || suppressFloatingClick) return;
        event.preventDefault();
        event.stopPropagation();
        setFloatingOpen(!floatingOpen);
    });

    menu?.addEventListener('click', async (event) => {
        const item = event.target.closest('[data-action]');
        if (!item) return;

        const action = item.dataset.action;
        setFloatingOpen(false);

        if (action === 'settings') {
            setModalOpen(true);
            switchTab('general');
            syncUi();
            return;
        }

        if (action === 'hide') {
            debugSwitchState('floatingMenu:disable');
            applyBooleanSetting('showFloatingButton', false);
            toastr.info('已关闭悬浮球，可在通用设置中重新开启', DISPLAY_NAME);
            return;
        }

        if (action === 'quick') {
            const prompt = window.prompt('\u8f93\u5165\u8981\u751f\u6210\u7684\u63d0\u793a\u8bcd');
            if (!prompt) return;
            try {
                await generateImage(prompt, 'quick');
                toastr.success('生成完成', DISPLAY_NAME);
            } catch (error) {
                toastr.error(error.message || String(error), DISPLAY_NAME);
            }
        }
    });

    const handleOutsideFloating = (event) => {
        const target = event.target;
        if (!(target instanceof Node) || !floatingOpen) return;
        if (!menu?.contains(target) && !button?.contains(target)) setFloatingOpen(false);
    };
    document.addEventListener('click', handleOutsideFloating);
    document.addEventListener('touchstart', handleOutsideFloating, { passive: true });

    initFloatingButtonPosition();
    makeFloatingDraggable();
    window.addEventListener('resize', () => {
        const rect = button?.getBoundingClientRect();
        if (rect) applyFloatingButtonPosition(rect.left, rect.top);
    });
}

function mountModal() {
    if (document.getElementById('st-scene-trigger-modal')) return;

    document.body.insertAdjacentHTML('beforeend', `
        <div id="st-scene-trigger-modal" class="st-scene-trigger-modal">
        <div class="st-scene-trigger-modal-backdrop"></div>
        <div class="st-scene-trigger-modal-shell" data-mode-accent="comfyui">
          <div class="st-scene-trigger-modal-topbar">
            <div class="st-scene-trigger-modal-title">
              <div class="st-scene-trigger-modal-title-icon"><i class="fa-solid fa-satellite-dish"></i></div>
              <div>
                <div class="st-scene-trigger-modal-heading">${DISPLAY_NAME} 控制台</div>
                <small id="st-scene-trigger-mode-subtitle">本地工作流 / 调度器模式</small>
              </div>
            </div>
            <div class="st-scene-trigger-modal-topbar-right">
              <button id="st-scene-trigger-topbar-check-update" class="st-scene-trigger-profile-switch" type="button" title="检查新版本更新" style="cursor: pointer; border: 1px solid rgba(255,255,255,0.12); padding: 4px 8px; border-radius: 8px; background: rgba(255,255,255,0.04); color: var(--linear-text-secondary); font-size: 11px; display: inline-flex; align-items: center; gap: 4px;">
                <i class="fa-solid fa-arrows-rotate" style="font-size:10px; opacity:0.85;"></i>
                <span id="st-scene-trigger-topbar-update-text">更新</span>
              </button>
              <div class="st-scene-trigger-profile-switch" title="全局配置预设管理">
                <i class="fa-solid fa-layer-group" style="font-size:12px;color:var(--linear-text-secondary);opacity:0.85;"></i>
                <span>预设</span>
                <select id="st-scene-trigger-global-profile-select">
                </select>
                <div class="st-scene-trigger-profile-btn-group">
                  <button id="st-scene-trigger-profile-save-btn" class="st-scene-trigger-profile-action-btn" type="button" title="保存修改到此预设"><i class="fa-solid fa-floppy-disk"></i></button>
                  <button id="st-scene-trigger-profile-new-btn" class="st-scene-trigger-profile-action-btn" type="button" title="另存为新预设"><i class="fa-solid fa-plus"></i></button>
                  <button id="st-scene-trigger-profile-more-btn" class="st-scene-trigger-profile-action-btn" type="button" title="预设管理 (重命名/删除/导入/导出)"><i class="fa-solid fa-ellipsis-vertical"></i></button>
                </div>
                <input id="st-scene-trigger-profile-import-file" type="file" accept=".json,application/json" style="display:none;">
                <div id="st-scene-trigger-profile-dropdown-menu" class="st-scene-trigger-profile-menu" style="display:none;">
                  <button id="st-scene-trigger-profile-rename-opt" class="st-scene-trigger-profile-menu-item" type="button"><i class="fa-solid fa-pen-to-square"></i> 重命名当前预设</button>
                  <button id="st-scene-trigger-profile-delete-opt" class="st-scene-trigger-profile-menu-item danger" type="button"><i class="fa-solid fa-trash-can"></i> 删除当前预设</button>
                  <div class="st-scene-trigger-profile-menu-divider"></div>
                  <button id="st-scene-trigger-profile-export-opt" class="st-scene-trigger-profile-menu-item" type="button"><i class="fa-solid fa-file-export"></i> 导出当前预设 (.json)</button>
                  <button id="st-scene-trigger-profile-export-all-opt" class="st-scene-trigger-profile-menu-item" type="button"><i class="fa-solid fa-box-archive"></i> 导出全部预设备份 (.json)</button>
                  <button id="st-scene-trigger-profile-import-opt" class="st-scene-trigger-profile-menu-item" type="button"><i class="fa-solid fa-file-import"></i> 导入预设文件 (.json)</button>
                </div>
              </div>
              <label class="st-scene-trigger-mode-switch">
                <span>模式</span>
                <select id="st-scene-trigger-current-mode">
                  <option value="comfyui">ComfyUI</option>
                  <option value="nai">NAI</option>
                  <option value="free">白嫖渠道</option>
                </select>
              </label>
              <div class="st-scene-trigger-modal-status-badge" style="display:none;"><span id="st-scene-trigger-mode-name">ComfyUI</span></div>
              <span class="st-scene-trigger-status-inline">状态: <span id="st-scene-trigger-modal-status">未启用</span></span>
              <button id="st-scene-trigger-theme-toggle-btn" class="st-scene-trigger-theme-toggle" type="button" title="切换明亮/暗黑主题"><i class="fa-solid fa-sun"></i></button>
              <button id="st-scene-trigger-modal-close" class="st-scene-trigger-modal-close" type="button"><i class="fa-solid fa-xmark"></i></button>
            </div>
          </div>
          <div class="st-scene-trigger-modal-main">
            <aside class="st-scene-trigger-modal-sidebar">
              <div class="st-scene-trigger-sidebar-section">控制面板</div>
              <div class="st-scene-trigger-tab-rail-viewport">
                <div class="st-scene-trigger-tab-rail" role="tablist" aria-label="控制面板">
                  <button class="st-scene-trigger-tab-button active" data-kite-tab="general"><i class="fa-solid fa-sliders"></i><span>通用设置</span></button>
                  <button class="st-scene-trigger-tab-button" data-kite-tab="plugins"><i class="fa-solid fa-code-merge"></i><span>扩展插件</span></button>
                  <button class="st-scene-trigger-tab-button" data-kite-tab="prompt"><i class="fa-solid fa-comment-dots"></i><span>提示词</span></button>
                  <button class="st-scene-trigger-tab-button" data-kite-tab="test"><i class="fa-solid fa-brush"></i><span>生成测试</span></button>
                  <button class="st-scene-trigger-tab-button" data-kite-tab="history"><i class="fa-solid fa-image"></i><span>图片历史</span></button>
                </div>
              </div>
              <div class="st-scene-trigger-sidebar-section">当前引擎</div>
              <div class="st-scene-trigger-mode-panel">
                <div class="st-scene-trigger-mode-panel-title" id="st-scene-trigger-mode-name-sidebar">ComfyUI</div>
                <div class="st-scene-trigger-mode-panel-subtitle" id="st-scene-trigger-mode-subtitle-sidebar">本地工作流 / 调度器模式</div>
              </div>
            </aside>
            <main class="st-scene-trigger-modal-content">
              <section class="st-scene-trigger-modal-panel active" data-kite-panel="general">
                <div class="st-scene-trigger-panel-title"><i class="fa-solid fa-display"></i><span>界面与连接</span></div>
                <div class="st-scene-trigger-modal-grid">
                  <div class="st-scene-trigger-field switch" data-setting-key="enabled">
                    <span>启用插件</span>
                    <span class="st-scene-trigger-toggle">
                      <input id="st-scene-trigger-modal-enabled" type="checkbox">
                      <span class="st-scene-trigger-toggle-ui"></span>
                    </span>
                  </div>
                  <div class="st-scene-trigger-field switch" data-setting-key="autoGenerate">
                    <span>自动生成</span>
                    <span class="st-scene-trigger-toggle">
                      <input id="st-scene-trigger-modal-auto" type="checkbox">
                      <span class="st-scene-trigger-toggle-ui"></span>
                    </span>
                  </div>
                  <label class="st-scene-trigger-field">
                    <span>界面主题</span>
                    <select id="st-scene-trigger-modal-theme">
                      <option value="dark">🌙 暗黑极简 (Linear)</option>
                      <option value="light">☀️ 极简纯白 (Vercel)</option>
                      <option value="auto">🌓 跟随系统/酒馆</option>
                    </select>
                  </label>
                  <label class="st-scene-trigger-field">
                    <span title="遇到提示词变不成按钮（卡代码）的情况时，请尝试切换此兼容模式。">扫描模式</span>
                    <select id="st-scene-trigger-modal-render-mode" title="遇到提示词变不成按钮（卡代码）的情况时，请尝试切换此兼容模式。">
                      <option value="smart">智能兼容 (Smart)</option>
                      <option value="legacy">经典模式 (Legacy)</option>
                      <option value="deep">深度扫描 (Deep)</option>
                    </select>
                  </label>
                  <div class="st-scene-trigger-field switch" data-setting-key="showFloatingButton">
                    <span>显示悬浮球</span>
                    <span class="st-scene-trigger-toggle">
                      <input id="st-scene-trigger-show-floating" type="checkbox">
                      <span class="st-scene-trigger-toggle-ui"></span>
                    </span>
                  </div>
                  <div class="st-scene-trigger-field switch" data-setting-key="singleGenerationOnly">
                    <span>单线程排队生成</span>
                    <span class="st-scene-trigger-toggle">
                      <input id="st-scene-trigger-modal-single-generation" type="checkbox">
                      <span class="st-scene-trigger-toggle-ui"></span>
                    </span>
                  </div>

                  <label class="st-scene-trigger-field">
                    <span>监听消息</span>
                    <select id="st-scene-trigger-modal-target">
                      <option value="assistant">仅角色消息</option>
                      <option value="user">仅用户消息</option>
                      <option value="both">双方消息</option>
                    </select>
                  </label>
                  <div class="st-scene-trigger-field switch block-item" style="grid-column: 1 / -1; align-items: start;">
                    <div style="display:flex; justify-content:space-between; width:100%; margin-bottom:12px;">
                      <span>内联图片大小调节 <small style="opacity:0.6;font-weight:normal;margin-left:6px;">拖动时界面会透明哦~</small></span>
                      <span id="st-scene-trigger-modal-inline-width-val" class="st-scene-trigger-nai-val-display" style="width:48px;">100%</span>
                    </div>
                    <input id="st-scene-trigger-modal-inline-width" type="range" min="10" max="100" step="1" value="100" class="st-scene-trigger-nai-slider" style="width:100%;">
                  </div>
                  <label class="st-scene-trigger-field">
                    <span>缓存保留天数</span>
                    <input id="st-scene-trigger-cache-retention-days" type="number" min="1" step="1">
                  </label>
                  <div class="st-scene-trigger-field st-scene-trigger-cache-card wide" style="grid-column: 1 / -1; display: flex; flex-direction: column; gap: 8px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span>当前生图缓存占用</span>
                      <strong id="st-scene-trigger-cache-usage" style="color: #79e4ff;">统计中...</strong>
                    </div>
                    <div class="st-scene-trigger-buttons" style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px;">
                      <button id="st-scene-trigger-clear-old-cache" class="menu_button" type="button" style="padding: 4px 10px; font-size: 11px;"><i class="fa-solid fa-broom"></i> 清理 7 天前旧图片</button>
                      <button id="st-scene-trigger-clear-cache" class="menu_button st-scene-trigger-cache-clear" type="button" style="padding: 4px 10px; font-size: 11px;"><i class="fa-solid fa-trash-can"></i> 清空全部缓存</button>
                      <button id="st-scene-trigger-export-zip" class="menu_button" type="button" style="padding: 4px 10px; font-size: 11px; background: rgba(104,215,255,0.15) !important; color: #79e4ff !important; border: 1px solid rgba(104,215,255,0.3) !important;"><i class="fa-solid fa-file-zipper"></i> 导出全部生图 (ZIP)</button>
                    </div>
                  </div>
                </div>
                <div class="st-scene-trigger-subpanel">
                  <div class="st-scene-trigger-subpanel-head">
                    <div class="st-scene-trigger-subpanel-title">
                      <i class="fa-solid fa-sliders"></i>
                      <span id="st-scene-trigger-mode-config-title">ComfyUI 参数配置</span>
                    </div>
                    <button id="st-scene-trigger-comfy-refresh-capabilities" class="menu_button st-scene-trigger-comfy-refresh-inline" type="button" data-comfy-only="true">
                      <i class="fa-solid fa-rotate"></i>
                      <span>获取模型与参数</span>
                    </button>
                  </div>
                  <div id="st-scene-trigger-mode-config-subtitle" class="st-scene-trigger-subpanel-hint">这里填写 ComfyUI 专属的连接与模型参数</div>
                  <div class="st-scene-trigger-modal-grid">
                    <label class="st-scene-trigger-field wide" data-nai-only="true">
                      <span>接口来源 (Endpoint)</span>
                      <select id="st-scene-trigger-nai-endpoint-mode">
                        <option value="official">🌐 官方 NAI Direct</option>
                        <option value="rbq">⚡ RBQ 接口 (Relay)</option>
                        <option value="custom">🔧 自定义接口 (Custom)</option>
                      </select>
                    </label>
                    <label class="st-scene-trigger-field wide" id="st-scene-trigger-url-field">
                      <span id="st-scene-trigger-endpoint-label">ComfyUI 地址</span>
                      <input id="st-scene-trigger-modal-scheduler-url" type="text" placeholder="">
                    </label>
                    <label class="st-scene-trigger-field" id="st-scene-trigger-key-field">
                      <span id="st-scene-trigger-key-label">访问密钥</span>
                      <input id="st-scene-trigger-modal-api-key" type="password" placeholder="输入访问密钥">
                    </label>
                    <div id="st-scene-trigger-nai-rbq-panel" data-nai-only="true" style="display:none; width:100%;">
                      <button id="st-scene-trigger-nai-rbq-connect" class="menu_button" type="button" style="width:100%; margin-bottom:8px;">
                        <i class="fa-solid fa-satellite-dish"></i> 连接并测速 (Connect & Test)
                      </button>
                      <div id="st-scene-trigger-nai-rbq-routes" style="display:none; margin-bottom:8px;"></div>
                      <div id="st-scene-trigger-nai-rbq-info" style="padding:6px 10px; border-radius:6px; background:rgba(104,215,255,.08); border:1px solid rgba(104,215,255,.15); font-size:11px; color:var(--linear-text-secondary);">
                        <span id="st-scene-trigger-nai-rbq-info-text">⏳ 请先填写 API Key，然后点击「连接并测速」</span>
                      </div>
                    </div>
                    <label class="st-scene-trigger-field">
                      <span id="st-scene-trigger-model-field-label">Checkpoint 模型</span>
                      <select id="st-scene-trigger-modal-model"></select>
                    </label>
                    <label class="st-scene-trigger-field" data-comfy-only="true">
                      <span>采样器 (Sampler)</span>
                      <select id="st-scene-trigger-comfy-sampler"></select>
                    </label>
                    <label class="st-scene-trigger-field" data-comfy-only="true">
                      <span>调度器 (Scheduler)</span>
                      <select id="st-scene-trigger-comfy-scheduler"></select>
                    </label>
                    <label class="st-scene-trigger-field">
                      <span>轮询间隔</span>
                      <input id="st-scene-trigger-modal-poll-ms" type="number" min="500" step="100">
                    </label>
                    <label class="st-scene-trigger-field" data-comfy-only="true">
                      <span>预设尺寸</span>
                      <select id="st-scene-trigger-comfy-size-preset">
                        <option value="square">方图 (1024x1024)</option>
                        <option value="portrait">竖图 (832x1216)</option>
                        <option value="landscape">横图 (1216x832)</option>
                        <option value="custom">自定义</option>
                      </select>
                    </label>
                    <label class="st-scene-trigger-field" data-comfy-only="true">
                      <span>宽度</span>
                      <input id="st-scene-trigger-comfy-width" type="number" min="64" step="64">
                    </label>
                    <label class="st-scene-trigger-field" data-comfy-only="true">
                      <span>高度</span>
                      <input id="st-scene-trigger-comfy-height" type="number" min="64" step="64">
                    </label>
                    <label class="st-scene-trigger-field" data-comfy-only="true">
                      <span>步数 (Steps)</span>
                      <input id="st-scene-trigger-comfy-steps" type="number" min="1" step="1">
                    </label>
                    <label class="st-scene-trigger-field" data-comfy-only="true">
                      <span>CFG</span>
                      <input id="st-scene-trigger-comfy-cfg" type="number" min="0" step="0.1">
                    </label>
                    <label class="st-scene-trigger-field" data-comfy-only="true">
                      <span>种子 (Seed) -1 为随机</span>
                      <input id="st-scene-trigger-comfy-seed" type="number" step="1">
                    </label>
                    <!-- 动态插件属性容器 -->
                    <div id="st-scene-trigger-plugin-fields-container" style="display: contents;"></div>
                  </div>
                <div class="st-scene-trigger-subpanel st-scene-trigger-nai-flow" data-nai-only="true">
                  <div class="st-scene-trigger-subpanel-head">
                    <div class="st-scene-trigger-subpanel-title">
                      <i class="fa-solid fa-wand-magic-sparkles"></i>
                      <span id="st-scene-trigger-nai-subpanel-title">NAI 参数配置</span>
                    </div>
                  </div>

                  <div class="st-scene-trigger-nai-group">
                    <div class="st-scene-trigger-nai-group-header">图片尺寸 (Dimensions)</div>
                    <div class="st-scene-trigger-nai-control-row">
                      <label>宽度 (Width)</label>
                      <input id="st-scene-trigger-nai-width" type="number" min="64" max="2048" step="64" value="832" class="st-scene-trigger-nai-num-input">
                    </div>
                    <input id="st-scene-trigger-nai-width-slider" type="range" min="64" max="2048" step="64" value="832" class="st-scene-trigger-nai-slider">
                    <div class="st-scene-trigger-nai-control-row" style="margin-top:8px;">
                      <label>高度 (Height)</label>
                      <input id="st-scene-trigger-nai-height" type="number" min="64" max="2048" step="64" value="1216" class="st-scene-trigger-nai-num-input">
                    </div>
                    <input id="st-scene-trigger-nai-height-slider" type="range" min="64" max="2048" step="64" value="1216" class="st-scene-trigger-nai-slider">
                    <div class="st-scene-trigger-nai-control-row" style="margin-top:8px;">
                      <label>官方预设 (Presets)</label>
                      <select id="st-scene-trigger-nai-size-preset" class="st-scene-trigger-nai-select">
                        <option value="custom" disabled selected hidden>选择尺寸...</option>
                        <optgroup label="NORMAL (Opus 免费)">
                          <option value="832x1216">竖图 (832×1216)</option>
                          <option value="1216x832">横图 (1216×832)</option>
                          <option value="1024x1024">方图 (1024×1024)</option>
                        </optgroup>
                        <optgroup label="LARGE (消耗点数)">
                          <option value="1024x1536">竖图 (1024×1536)</option>
                          <option value="1536x1024">横图 (1536×1024)</option>
                          <option value="1472x1472">方图 (1472×1472)</option>
                        </optgroup>
                        <optgroup label="WALLPAPER (消耗点数)">
                          <option value="1088x1920">竖图 (1088×1920)</option>
                          <option value="1920x1088">横图 (1920×1088)</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  <!-- 生成设置 -->
                  <div class="st-scene-trigger-nai-group">
                    <div class="st-scene-trigger-nai-group-header">生成设置</div>
                    <div class="st-scene-trigger-nai-control-row">
                      <label>迭代步数 (Steps)</label>
                      <span id="st-scene-trigger-nai-steps-val" class="st-scene-trigger-nai-val-display">28</span>
                    </div>
                    <input id="st-scene-trigger-nai-steps" type="range" min="1" max="50" step="1" value="28" class="st-scene-trigger-nai-slider">
                    <div class="st-scene-trigger-nai-control-row" style="margin-top:8px;">
                      <label>提示词引导 (Guidance)</label>
                      <span id="st-scene-trigger-nai-scale-val" class="st-scene-trigger-nai-val-display">5</span>
                    </div>
                    <input id="st-scene-trigger-nai-scale" type="range" min="1" max="10" step="0.1" value="5" class="st-scene-trigger-nai-slider">
                  </div>

                  <!-- 随机种子 (Seed) -->
                  <div class="st-scene-trigger-nai-group">
                    <div class="st-scene-trigger-nai-group-header">随机种子 (Seed)</div>
                    <div class="st-scene-trigger-nai-seed-row">
                      <input id="st-scene-trigger-nai-seed" type="text" placeholder="随机 (Random)" class="st-scene-trigger-nai-seed-input">
                      <button id="st-scene-trigger-nai-seed-random" class="menu_button st-scene-trigger-nai-seed-btn" type="button" title="Randomize">🎲</button>
                    </div>
                  </div>

                  <!-- 高级设置 (Advanced) -->
                  <details class="st-scene-trigger-nai-group st-scene-trigger-nai-details">
                    <summary>高级设置 (Advanced)</summary>
                    <div class="st-scene-trigger-nai-details-content">
                      <label class="st-scene-trigger-nai-adv-label">采样器 (Sampler)</label>
                      <select id="st-scene-trigger-nai-sampler" class="st-scene-trigger-nai-select">
                        <option value="k_euler_ancestral">Euler Ancestral</option>
                        <option value="k_euler">Euler</option>
                        <option value="k_dpmpp_2s_ancestral">DPM++ 2S Ancestral</option>
                        <option value="k_dpmpp_2m">DPM++ 2M</option>
                        <option value="k_dpmpp_sde">DPM++ SDE</option>
                        <option value="k_dpmpp_2m_sde">DPM++ 2M SDE</option>
                      </select>

                      <div class="st-scene-trigger-nai-control-row" style="margin-top:12px;">
                        <label>提示词引导缩放 (Guidance Rescale)</label>
                        <span id="st-scene-trigger-nai-cfg-rescale-val" class="st-scene-trigger-nai-val-display">0</span>
                      </div>
                      <input id="st-scene-trigger-nai-cfg-rescale" type="range" min="0" max="1" step="0.05" value="0" class="st-scene-trigger-nai-slider">

                      <div class="st-scene-trigger-nai-control-row" style="margin-top:12px;">
                        <label>无条件比例 (Uncond Scale)</label>
                        <span id="st-scene-trigger-nai-uncond-scale-val" class="st-scene-trigger-nai-val-display">0</span>
                      </div>
                      <input id="st-scene-trigger-nai-uncond-scale" type="range" min="0" max="2" step="0.05" value="0" class="st-scene-trigger-nai-slider">

                      <label class="st-scene-trigger-nai-adv-label" style="margin-top:12px;">噪声调度 (Noise Schedule)</label>
                      <select id="st-scene-trigger-nai-noise-schedule" class="st-scene-trigger-nai-select">
                        <option value="karras">Karras (推荐)</option>
                        <option value="native">Native</option>
                        <option value="exponential">Exponential</option>
                      </select>

                      <div class="st-scene-trigger-nai-checkbox-grid" style="margin-top:12px;">
                        <label class="st-scene-trigger-nai-ck"><input id="st-scene-trigger-nai-variety" type="checkbox"> Variety+</label>
                        <label class="st-scene-trigger-nai-ck" style="opacity:0.5;"><input type="checkbox" disabled> SMEA</label>
                        <label class="st-scene-trigger-nai-ck" style="opacity:0.5;"><input type="checkbox" disabled> DYN</label>
                        <label class="st-scene-trigger-nai-ck" style="opacity:0.5;"><input type="checkbox" disabled> Decrisper</label>
                        <label class="st-scene-trigger-nai-ck" style="opacity:0.5;"><input type="checkbox" disabled> Quality Tags</label>
                      </div>
                    </div>
                  </details>

                  <!-- 风格迁移 (Vibe Transfer) -->
                  <details class="st-scene-trigger-nai-group st-scene-trigger-nai-details" id="st-scene-trigger-nai-vibe-section">
                    <summary>风格迁移 (Vibe Transfer)</summary>
                    <div class="st-scene-trigger-nai-details-content">
                      <button id="st-scene-trigger-nai-add-vibe" class="menu_button" type="button" style="width:100%;">+ 添加参考图 (Vibe Image)</button>
                      <div id="st-scene-trigger-nai-vibe-deck" class="st-scene-trigger-ref-deck" style="margin-top:8px;"></div>
                      <p class="st-scene-trigger-nai-hint-text">最多 6 张。与"精准参考"互斥，同时只能启用一种。</p>
                    </div>
                  </details>

                  <!-- 精准参考 (Precise Reference) -->
                  <details class="st-scene-trigger-nai-group st-scene-trigger-nai-details" id="st-scene-trigger-nai-precise-section">
                    <summary>精准参考 (Precise Reference)</summary>
                    <div class="st-scene-trigger-nai-details-content">
                      <button id="st-scene-trigger-nai-add-precise" class="menu_button" type="button" style="width:100%;">+ 精准参考图 (1/6)</button>
                      <div id="st-scene-trigger-nai-precise-deck" class="st-scene-trigger-ref-deck" style="margin-top:8px;"></div>
                      <p class="st-scene-trigger-nai-hint-text">最多 6 张，支持角色和画风混合。与老版"风格迁移"互斥。</p>
                    </div>
                  </details>
                </div>
                  <div class="st-scene-trigger-subpanel" data-comfy-only="true">
                    <div class="st-scene-trigger-subpanel-title">
                      <i class="fa-solid fa-diagram-project"></i>
                      <span>工作流 (Workflow) 管理</span>
                    </div>
                    <div class="st-scene-trigger-subpanel-hint">支持动态替换提示词、模型、宽高、步数、CFG、采样器、调度器和种子等工作流参数。</div>
                    <div class="st-scene-trigger-modal-grid">
                      <div class="st-scene-trigger-field wide">
                        <span>选择工作流</span>
                        <div class="st-scene-trigger-workflow-row">
                          <select id="st-scene-trigger-comfy-workflow-select"></select>
                          <button id="st-scene-trigger-comfy-workflow-import" class="menu_button st-scene-trigger-icon-button" type="button" title="导入工作流 (支持 .json 或 ComfyUI 原图 .png)">
                            <i class="fa-solid fa-file-import"></i>
                          </button>
                          <button id="st-scene-trigger-comfy-workflow-update" class="menu_button st-scene-trigger-icon-button" type="button" title="更新当前工作流">
                            <i class="fa-solid fa-upload"></i>
                          </button>
                          <button id="st-scene-trigger-comfy-workflow-save-as" class="menu_button st-scene-trigger-icon-button" type="button" title="另存为新工作流">
                            <i class="fa-solid fa-floppy-disk"></i>
                          </button>
                          <button id="st-scene-trigger-comfy-workflow-delete" class="menu_button st-scene-trigger-icon-button st-scene-trigger-icon-button-danger" type="button" title="删除当前工作流">
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </div>
                        <input id="st-scene-trigger-comfy-workflow-import-file" type="file" accept=".json,application/json,.png,image/png" hidden>
                      </div>

                      <!-- 可视化节点参数映射卡片 -->
                      <div id="st-scene-trigger-comfy-mapping-card" class="st-scene-trigger-field wide" style="display:flex; flex-direction:column; gap:10px; padding:12px; background:var(--linear-surface, rgba(255,255,255,0.03)); border:1px solid var(--linear-border-standard, rgba(255,255,255,0.08)); border-radius:10px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
                          <span style="font-size:12.5px; font-weight:700; color:#38bdf8; display:inline-flex; align-items:center; gap:6px;">
                            <i class="fa-solid fa-diagram-project"></i> 节点参数可视化映射 (Node Mapping)
                          </span>
                          <button id="st-scene-trigger-comfy-workflow-retrace" class="menu_button" type="button" style="font-size:11px; padding:2px 8px; border-radius:6px; cursor:pointer;" title="重新扫描工作流拓扑结构">
                            <i class="fa-solid fa-wand-magic-sparkles"></i> 智能重新识别
                          </button>
                        </div>
                        <div id="st-scene-trigger-comfy-mapping-status" style="font-size:11.5px; color:var(--linear-text-muted, rgba(255,255,255,0.6));">
                          导入工作流后系统已自动识别关键节点。如需指定其他节点，点击下方下拉菜单调整即可。
                        </div>

                        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:10px; margin-top:2px;">
                          <!-- 正面提示词节点 -->
                          <div style="display:flex; flex-direction:column; gap:4px;">
                            <span style="font-size:12px; font-weight:600; color:#93c5fd; display:flex; align-items:center; gap:4px;">
                              <i class="fa-solid fa-circle-check" style="color:#60a5fa;"></i> 正面提示词节点 (Positive)
                            </span>
                            <select id="st-scene-trigger-comfy-map-positive" style="font-size:12px; padding:4px 8px; border-radius:6px; background:var(--linear-bg-subtle, rgba(0,0,0,0.3)); color:inherit; border:1px solid var(--linear-border-standard, rgba(255,255,255,0.1));"></select>
                          </div>

                          <!-- 负面提示词节点 -->
                          <div style="display:flex; flex-direction:column; gap:4px;">
                            <span style="font-size:12px; font-weight:600; color:#fca5a5; display:flex; align-items:center; gap:4px;">
                              <i class="fa-solid fa-circle-xmark" style="color:#f87171;"></i> 负面提示词节点 (Negative)
                            </span>
                            <select id="st-scene-trigger-comfy-map-negative" style="font-size:12px; padding:4px 8px; border-radius:6px; background:var(--linear-bg-subtle, rgba(0,0,0,0.3)); color:inherit; border:1px solid var(--linear-border-standard, rgba(255,255,255,0.1));"></select>
                          </div>

                          <!-- 采样器节点 -->
                          <div style="display:flex; flex-direction:column; gap:4px;">
                            <span style="font-size:12px; font-weight:600; color:#c084fc; display:flex; align-items:center; gap:4px;">
                              <i class="fa-solid fa-sliders" style="color:#a855f7;"></i> 采样控制与随机种子 (KSampler)
                            </span>
                            <select id="st-scene-trigger-comfy-map-sampler" style="font-size:12px; padding:4px 8px; border-radius:6px; background:var(--linear-bg-subtle, rgba(0,0,0,0.3)); color:inherit; border:1px solid var(--linear-border-standard, rgba(255,255,255,0.1));"></select>
                            <div style="display:flex; gap:12px; flex-wrap:wrap; font-size:11px; color:var(--linear-text-secondary, rgba(255,255,255,0.7)); margin-top:2px;">
                              <label style="display:inline-flex; align-items:center; gap:4px; cursor:pointer;"><input type="checkbox" id="st-scene-trigger-comfy-map-override-sampler" checked> 允许酒馆覆盖采样器/步数/CFG</label>
                              <label style="display:inline-flex; align-items:center; gap:4px; cursor:pointer;"><input type="checkbox" id="st-scene-trigger-comfy-map-override-seed" checked> 允许酒馆控制随机种子</label>
                            </div>
                          </div>

                          <!-- 尺寸规格节点 -->
                          <div style="display:flex; flex-direction:column; gap:4px;">
                            <span style="font-size:12px; font-weight:600; color:#38bdf8; display:flex; align-items:center; gap:4px;">
                              <i class="fa-solid fa-expand" style="color:#0ea5e9;"></i> 生图分辨率规格节点 (Latent)
                            </span>
                            <select id="st-scene-trigger-comfy-map-latent" style="font-size:12px; padding:4px 8px; border-radius:6px; background:var(--linear-bg-subtle, rgba(0,0,0,0.3)); color:inherit; border:1px solid var(--linear-border-standard, rgba(255,255,255,0.1));"></select>
                            <div style="display:flex; gap:12px; font-size:11px; color:var(--linear-text-secondary, rgba(255,255,255,0.7)); margin-top:2px;">
                              <label style="display:inline-flex; align-items:center; gap:4px; cursor:pointer;"><input type="checkbox" id="st-scene-trigger-comfy-map-override-size" checked> 允许酒馆面板尺寸设置覆盖宽/高</label>
                            </div>
                          </div>

                          <!-- 基础模型节点 -->
                          <div style="display:flex; flex-direction:column; gap:4px; grid-column: 1 / -1;">
                            <span style="font-size:12px; font-weight:600; color:#fde047; display:flex; align-items:center; gap:4px;">
                              <i class="fa-solid fa-cube" style="color:#eab308;"></i> 基础模型加载节点 (Model)
                            </span>
                            <select id="st-scene-trigger-comfy-map-model" style="font-size:12px; padding:4px 8px; border-radius:6px; background:var(--linear-bg-subtle, rgba(0,0,0,0.3)); color:inherit; border:1px solid var(--linear-border-standard, rgba(255,255,255,0.1));"></select>
                            <div style="display:flex; gap:12px; font-size:11px; color:var(--linear-text-secondary, rgba(255,255,255,0.7)); margin-top:2px;">
                              <label style="display:inline-flex; align-items:center; gap:4px; cursor:pointer;"><input type="checkbox" id="st-scene-trigger-comfy-map-override-model"> 允许酒馆模型覆盖工作流原生模型 (默认关闭，保留工作流内预设模型)</label>
                            </div>
                          </div>

                          <!-- 图片保存节点与路径配置 -->
                          <div style="display:flex; flex-direction:column; gap:4px; grid-column: 1 / -1; margin-top:2px;">
                            <span style="font-size:12px; font-weight:600; color:#34d399; display:flex; align-items:center; gap:4px;">
                              <i class="fa-solid fa-floppy-disk" style="color:#10b981;"></i> 图片保存节点与路径前缀 (SaveImage)
                            </span>
                            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
                              <select id="st-scene-trigger-comfy-map-save-image" style="font-size:12px; padding:4px 8px; border-radius:6px; background:var(--linear-bg-subtle, rgba(0,0,0,0.3)); color:inherit; border:1px solid var(--linear-border-standard, rgba(255,255,255,0.1)); flex: 1; min-width: 200px;"></select>
                              <input type="text" id="st-scene-trigger-comfy-map-filename-prefix" placeholder="留空则保持工作流原样 (如 TS/%date:yyyy-MM-dd%/anima-%date:HH-mm-ss%)" style="font-size:12px; padding:4px 8px; border-radius:6px; background:var(--linear-bg-subtle, rgba(0,0,0,0.3)); color:inherit; border:1px solid var(--linear-border-standard, rgba(255,255,255,0.1)); flex: 2; min-width: 240px;">
                            </div>
                            <span style="font-size:11px; color:var(--linear-text-secondary, rgba(255,255,255,0.6));">
                              * 可在此直接填写自定义子文件夹（如 <code>TS/%date:yyyy-MM-dd%/anima-%date:HH-mm-ss%</code>），留空则 100% 保持工作流原样，避免手动修改 JSON 引起语法报错。
                            </span>
                          </div>
                        </div>
                      </div>

                      <!-- 折叠式高级原始 JSON -->
                      <details id="st-scene-trigger-comfy-raw-details" class="st-scene-trigger-field wide" style="margin-top:6px; border:1px solid var(--linear-border-standard, rgba(255,255,255,0.08)); border-radius:8px; padding:6px 12px; background:var(--linear-surface, rgba(255,255,255,0.02));">
                        <summary style="font-size:12px; color:var(--linear-text-muted, rgba(255,255,255,0.6)); cursor:pointer; user-select:none; display:flex; align-items:center; gap:6px;">
                          <i class="fa-solid fa-code"></i> <span>高级选项：查看与编辑原始工作流 JSON</span>
                        </summary>
                        <div style="margin-top:8px;">
                          <textarea id="st-scene-trigger-comfy-workflow-json" rows="12" placeholder="在这里粘贴或编辑 ComfyUI workflow JSON" style="font-family:monospace; font-size:11.5px;"></textarea>
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
                <div class="st-scene-trigger-modal-actions st-scene-trigger-modal-actions-footer">
                  <button id="st-scene-trigger-save-settings" class="menu_button" type="button">保存设置</button>
                </div>
              </section>

              <section class="st-scene-trigger-modal-panel" data-kite-panel="plugins">
                <div class="st-scene-trigger-panel-title"><i class="fa-solid fa-code-merge"></i><span>子插件 (Sub-Plugins) 中心</span></div>
                <div class="st-scene-trigger-subpanel-hint" style="margin-bottom:8px;">从 Github 仓库安装增强型工作流、翻译脚本及其他外围功能。</div>
                <div class="st-scene-trigger-modal-grid">
                  <label class="st-scene-trigger-field wide">
                    <span>仓库源通道与地址 (Repository URL)</span>
                    <div class="st-scene-trigger-plugin-repo-row" style="display:flex;gap:6px;width:100%;min-width:0;align-items:center;">
                      <select id="st-scene-trigger-plugin-channel" style="width:130px;min-width:120px;height:32px;margin:0;font-size:12px;border-radius:6px;background:var(--linear-surface);color:var(--linear-text-primary);border:1px solid var(--linear-border-standard);">
                        <option value="https://raw.githubusercontent.com/TTWParty/RBQ-Draw-Plugins/main/plugins.json">🛡️ 正式版 (main)</option>
                        <option value="https://raw.githubusercontent.com/TTWParty/RBQ-Draw-Plugins/beta/plugins.json">🧪 测试版 (beta)</option>
                        <option value="https://cdn.jsdelivr.net/gh/TTWParty/RBQ-Draw-Plugins@beta/plugins.json">🚀 测试版 (jsDelivr CDN加速)</option>
                      </select>
                      <input id="st-scene-trigger-plugin-repo" type="text" value="https://raw.githubusercontent.com/TTWParty/RBQ-Draw-Plugins/main/plugins.json" style="flex:1;min-width:0;">
                      <button id="st-scene-trigger-plugin-refresh" class="menu_button st-scene-trigger-icon-button"><i class="fa-solid fa-arrows-rotate"></i> 刷新</button>
                    </div>
                  </label>
                </div>
                
                <div class="st-scene-trigger-subpanel">
                    <div class="st-scene-trigger-subpanel-head">
                        <div class="st-scene-trigger-subpanel-title"><i class="fa-solid fa-cubes"></i> <span>浏览与安装</span></div>
                    </div>
                    <div id="st-scene-trigger-plugin-list" style="margin-top:8px; display:flex; flex-direction:column; gap:8px;">
                        <div style="text-align:center; padding:12px; color:var(--linear-text-muted);">点击刷新获取插件列表...</div>
                    </div>
                </div>
              </section>

              <section class="st-scene-trigger-modal-panel" data-kite-panel="prompt">
                <div class="st-scene-trigger-panel-title"><i class="fa-solid fa-wave-square"></i><span>提示词</span></div>
                <div class="st-scene-trigger-modal-grid">
                  <label class="st-scene-trigger-field"><span>开始标记</span><input id="st-scene-trigger-modal-start-tag" type="text"></label>
                  <label class="st-scene-trigger-field"><span>结束标记</span><input id="st-scene-trigger-modal-end-tag" type="text"></label>
                  <label class="st-scene-trigger-field wide"><span>前置提示词</span><input id="st-scene-trigger-modal-prefix" type="text"></label>
                  <label class="st-scene-trigger-field wide"><span>后置提示词</span><input id="st-scene-trigger-modal-suffix" type="text"></label>
                  <label class="st-scene-trigger-field wide"><span>负面提示词</span><textarea id="st-scene-trigger-modal-negative" rows="4"></textarea></label>
                  <label class="st-scene-trigger-field wide"><span>自定义正则</span><input id="st-scene-trigger-modal-custom-regex" type="text" placeholder="例如: \\{image:(.*?)\\}"></label>
                </div>
                <div class="st-scene-trigger-help-box">
                  <code>image###提示词###</code>
                  <code>[img]提示词[/img]</code>
                  <code>[scene]提示词[/scene]</code>
                </div>
                <div class="st-scene-trigger-preview-box">
                  <div class="st-scene-trigger-preview-label">提示词预览</div>
                  <div id="st-scene-trigger-prompt-preview" class="st-scene-trigger-preview-content"></div>
                </div>
              </section>

              <section class="st-scene-trigger-modal-panel" data-kite-panel="test">
                <div class="st-scene-trigger-panel-title"><i class="fa-solid fa-flask-vial"></i><span>生成测试</span></div>
                <div class="st-scene-trigger-quick-card">
                  <div class="st-scene-trigger-quick-label">当前模型</div>
                  <div id="st-scene-trigger-model-label" class="st-scene-trigger-quick-value">未选择模型</div>
                </div>
                <label class="st-scene-trigger-field wide">
                  <span>测试提示词</span>
                  <textarea id="st-scene-trigger-test-prompt" rows="5" placeholder="输入一段用于测试生图的提示词"></textarea>
                </label>
                <div class="st-scene-trigger-modal-actions">
                  <button id="st-scene-trigger-test" class="menu_button" type="button">测试生成</button>
                  <button id="st-scene-trigger-test-llm" class="menu_button" type="button" style="display: none; background: rgba(100,180,255,0.12); border: 1px solid rgba(100,180,255,0.3); font-weight: 600;"><i class="fa-solid fa-wand-magic-sparkles"></i> 智能测试生成</button>
                </div>
                <div id="st-scene-trigger-test-result" style="margin-top: 16px; text-align: center; display: flex; justify-content: center; align-items: center; min-height: 120px; background: var(--linear-bg-subtle); border-radius: 12px; border: 1px dashed var(--linear-border-standard);">
                  <span style="color: var(--linear-text-muted); font-size: 14px;">生成的测试图像将显示在这里</span>
                </div>
              </section>

              <section class="st-scene-trigger-modal-panel" data-kite-panel="history">
                <div class="st-scene-trigger-panel-title"><i class="fa-solid fa-clock-rotate-left"></i><span>图片历史</span></div>
                <div id="st-scene-trigger-modal-history"></div>
              </section>
            </main>
          </div>
        </div>
      </div>
    `);

    setupModeConfigTab();
    setupDynamicPanels();
    document.querySelectorAll('.st-scene-trigger-field.switch[data-setting-key]').forEach(bindSwitchField);
    document.querySelectorAll('.st-scene-trigger-tab-rail-viewport').forEach(bindTabRailDrag);
    updateDebugOverlay('mount-modal');

    document.getElementById('st-scene-trigger-modal-close')?.addEventListener('click', () => setModalOpen(false));
    document.getElementById('st-scene-trigger-topbar-check-update')?.addEventListener('click', () => {
        void checkForUpdate(true);
    });
    document.querySelector('#st-scene-trigger-modal .st-scene-trigger-modal-backdrop')?.addEventListener('click', () => setModalOpen(false));

    document.getElementById('st-scene-trigger-theme-toggle-btn')?.addEventListener('click', () => {
        const settings = getSettings();
        const currentEffective = resolveEffectiveTheme(settings.theme);
        const nextTheme = currentEffective === 'light' ? 'dark' : 'light';
        settings.theme = nextTheme;
        applyTheme(nextTheme);
        saveSettingsDebounced();
        if (typeof toastr !== 'undefined' && toastr.info) {
            toastr.info(nextTheme === 'light' ? '已切换至极简纯白 (Vercel) 主题' : '已切换至暗黑极简 (Linear) 主题', DISPLAY_NAME);
        }
    });

    document.getElementById('st-scene-trigger-modal-theme')?.addEventListener('change', (event) => {
        const nextTheme = event.target.value;
        const settings = getSettings();
        settings.theme = nextTheme;
        applyTheme(nextTheme);
        saveSettingsDebounced();
    });

    document.querySelectorAll('[data-kite-tab]').forEach((element) => {
        element.addEventListener('click', () => switchTab(element.dataset.kiteTab));
    });

    // === 全局配置预设 (Global Profiles) 事件绑定 ===
    document.getElementById('st-scene-trigger-global-profile-select')?.addEventListener('change', (event) => {
        const targetId = event.target.value;
        if (targetId) switchGlobalProfile(targetId);
    });

    document.getElementById('st-scene-trigger-profile-save-btn')?.addEventListener('click', () => {
        saveFromModal();
        saveCurrentGlobalProfile(true);
    });

    document.getElementById('st-scene-trigger-profile-new-btn')?.addEventListener('click', () => {
        const active = getActiveGlobalProfile();
        const suggestedName = active ? `${active.name} 副本` : '新配置预设';
        const input = window.prompt('请输入新全局配置预设的名称：', suggestedName);
        if (input === null) return;
        const name = input.trim();
        if (!name) {
            toastr.warning('预设名称不能为空', DISPLAY_NAME);
            return;
        }
        createNewGlobalProfile(name);
    });

    const profileMenu = document.getElementById('st-scene-trigger-profile-dropdown-menu');
    const profileMoreBtn = document.getElementById('st-scene-trigger-profile-more-btn');

    profileMoreBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (profileMenu) {
            profileMenu.style.display = profileMenu.style.display === 'none' ? 'flex' : 'none';
        }
    });

    document.addEventListener('click', (e) => {
        if (profileMenu && profileMenu.style.display !== 'none') {
            if (!profileMenu.contains(e.target) && e.target !== profileMoreBtn) {
                profileMenu.style.display = 'none';
            }
        }
    });

    document.getElementById('st-scene-trigger-profile-rename-opt')?.addEventListener('click', () => {
        if (profileMenu) profileMenu.style.display = 'none';
        const active = getActiveGlobalProfile();
        const input = window.prompt('请输入新的预设名称：', active.name);
        if (input === null) return;
        const name = input.trim();
        if (!name) {
            toastr.warning('预设名称不能为空', DISPLAY_NAME);
            return;
        }
        renameGlobalProfile(active.id, name);
    });

    document.getElementById('st-scene-trigger-profile-delete-opt')?.addEventListener('click', () => {
        if (profileMenu) profileMenu.style.display = 'none';
        const gp = ensureGlobalProfiles();
        if (gp.profiles.length <= 1) {
            toastr.warning('至少需要保留一个全局配置预设，无法删除', DISPLAY_NAME);
            return;
        }
        const active = getActiveGlobalProfile();
        const ok = window.confirm(`确定要删除配置预设「${active.name}」吗？删除后不可恢复。`);
        if (!ok) return;
        deleteGlobalProfile(active.id);
    });

    document.getElementById('st-scene-trigger-profile-export-opt')?.addEventListener('click', () => {
        if (profileMenu) profileMenu.style.display = 'none';
        saveFromModal();
        saveCurrentGlobalProfile(false);
        const active = getActiveGlobalProfile();
        const exportData = {
            type: 'rbq_draw_global_profile',
            version: 1,
            exportedAt: Date.now(),
            profile: {
                name: active.name,
                data: active.data,
            }
        };
        downloadJsonFile(`RBQ_配置预设_${active.name}.json`, exportData);
        toastr.success(`已导出预设「${active.name}」`, DISPLAY_NAME);
    });

    document.getElementById('st-scene-trigger-profile-export-all-opt')?.addEventListener('click', () => {
        if (profileMenu) profileMenu.style.display = 'none';
        saveFromModal();
        saveCurrentGlobalProfile(false);
        const gp = ensureGlobalProfiles();
        const exportData = {
            type: 'rbq_draw_global_profiles_bundle',
            version: 1,
            exportedAt: Date.now(),
            activeProfileId: gp.activeProfileId,
            profiles: gp.profiles.map(p => ({
                name: p.name,
                data: p.data,
            }))
        };
        const dateStr = new Date().toISOString().slice(0, 10);
        downloadJsonFile(`RBQ_全部配置预设备份_${dateStr}.json`, exportData);
        toastr.success('已导出全部配置预设备份', DISPLAY_NAME);
    });

    const fileInput = document.getElementById('st-scene-trigger-profile-import-file');
    document.getElementById('st-scene-trigger-profile-import-opt')?.addEventListener('click', () => {
        if (profileMenu) profileMenu.style.display = 'none';
        fileInput?.click();
    });

    fileInput?.addEventListener('change', async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const text = await file.text();
            const json = JSON.parse(text);
            importGlobalProfiles(json, file.name);
        } catch (err) {
            toastr.error('导入预设失败: ' + (err.message || String(err)), DISPLAY_NAME);
        } finally {
            e.target.value = '';
        }
    });

    document.getElementById('st-scene-trigger-current-mode')?.addEventListener('change', () => {
        saveFromModal();
        updateModeUi();
        refreshComfyUiCapabilities().catch((error) => {
            console.warn(`[${EXTENSION_NAME}] comfy capabilities`, error);
        });
        if (typeof updateNaiRbqVisibility === 'function') updateNaiRbqVisibility();
    });

    ['comfyui', 'nai', 'free'].forEach((mode) => {
        document.getElementById(`st-scene-trigger-${mode === 'comfyui' ? 'comfy' : mode}-size-preset`)?.addEventListener('change', (event) => {
            applySizePreset(event.target.value, mode);
        });
    });

    // === NAI Flow: Slider ↔ Input Sync ===
    // Width/Height: slider ↔ number input
    const naiWidthSlider = document.getElementById('st-scene-trigger-nai-width-slider');
    const naiWidthInput = document.getElementById('st-scene-trigger-nai-width');
    const naiHeightSlider = document.getElementById('st-scene-trigger-nai-height-slider');
    const naiHeightInput = document.getElementById('st-scene-trigger-nai-height');

    if (naiWidthSlider && naiWidthInput) {
        naiWidthSlider.addEventListener('input', () => { naiWidthInput.value = naiWidthSlider.value; });
        naiWidthInput.addEventListener('input', () => { naiWidthSlider.value = naiWidthInput.value; });
    }
    if (naiHeightSlider && naiHeightInput) {
        naiHeightSlider.addEventListener('input', () => { naiHeightInput.value = naiHeightSlider.value; });
        naiHeightInput.addEventListener('input', () => { naiHeightSlider.value = naiHeightInput.value; });
    }

    // Steps: slider → display
    const naiSteps = document.getElementById('st-scene-trigger-nai-steps');
    const naiStepsVal = document.getElementById('st-scene-trigger-nai-steps-val');
    if (naiSteps && naiStepsVal) {
        naiSteps.addEventListener('input', () => {
            enforceNaiMaxSteps();
            naiStepsVal.textContent = naiSteps.value;
        });
        naiSteps.addEventListener('change', () => { enforceNaiMaxSteps(); });
    }

    // Scale: slider → display
    const naiScale = document.getElementById('st-scene-trigger-nai-scale');
    const naiScaleVal = document.getElementById('st-scene-trigger-nai-scale-val');
    if (naiScale && naiScaleVal) {
        naiScale.addEventListener('input', () => { naiScaleVal.textContent = naiScale.value; });
    }

    // CFG Rescale: slider → display
    const naiCfgRescale = document.getElementById('st-scene-trigger-nai-cfg-rescale');
    const naiCfgRescaleVal = document.getElementById('st-scene-trigger-nai-cfg-rescale-val');
    if (naiCfgRescale && naiCfgRescaleVal) {
        naiCfgRescale.addEventListener('input', () => { naiCfgRescaleVal.textContent = naiCfgRescale.value; });
    }

    // Uncond Scale: slider → display
    const naiUncondScale = document.getElementById('st-scene-trigger-nai-uncond-scale');
    const naiUncondScaleVal = document.getElementById('st-scene-trigger-nai-uncond-scale-val');
    if (naiUncondScale && naiUncondScaleVal) {
        naiUncondScale.addEventListener('input', () => { naiUncondScaleVal.textContent = naiUncondScale.value; });
    }

    // Inline Image Width: slider → display & live preview + modal transparency
    const inlineWidthSlider = document.getElementById('st-scene-trigger-modal-inline-width');
    const inlineWidthVal = document.getElementById('st-scene-trigger-modal-inline-width-val');
    if (inlineWidthSlider && inlineWidthVal) {
        inlineWidthSlider.addEventListener('input', () => {
            inlineWidthVal.textContent = `${inlineWidthSlider.value}%`;
            document.documentElement.style.setProperty('--st-inline-img-max-width', `${inlineWidthSlider.value}%`);
        });

        // Make modal transparent when adjusting
        const modalContainer = document.querySelector('.st-scene-trigger-modal-shell');
        if (modalContainer) {
            const makeTransparent = () => {
                modalContainer.style.transition = 'opacity 0.2s ease';
                modalContainer.style.opacity = '0.2';
            };
            const makeOpaque = () => {
                modalContainer.style.opacity = '1';
            };
            inlineWidthSlider.addEventListener('mousedown', makeTransparent);
            inlineWidthSlider.addEventListener('touchstart', makeTransparent, { passive: true });
            inlineWidthSlider.addEventListener('mouseup', makeOpaque);
            inlineWidthSlider.addEventListener('touchend', makeOpaque, { passive: true });
            // Handle edge case where mouse leaves the slider while dragging
            inlineWidthSlider.addEventListener('mouseleave', (e) => {
                if (e.buttons === 1) makeOpaque(); // If left mouse button is held down while leaving, restore opacity
            });
            window.addEventListener('mouseup', makeOpaque); // Global fallback
        }
    }

    // NAI Size Preset → update sliders + inputs
    document.getElementById('st-scene-trigger-nai-size-preset')?.addEventListener('change', (event) => {
        const val = event.target.value;
        if (val && val.includes('x')) {
            const [w, h] = val.split('x').map(Number);
            if (naiWidthInput) naiWidthInput.value = w;
            if (naiWidthSlider) naiWidthSlider.value = w;
            if (naiHeightInput) naiHeightInput.value = h;
            if (naiHeightSlider) naiHeightSlider.value = h;
        }
    });

    // Seed Randomize
    document.getElementById('st-scene-trigger-nai-seed-random')?.addEventListener('click', () => {
        const seedEl = document.getElementById('st-scene-trigger-nai-seed');
        if (seedEl) seedEl.value = Math.floor(Math.random() * 4294967295);
    });

    // === NAI Endpoint Mode Selector (官方 / RBQ Auto-Route) ===
    // _naiIsFreeOnly is declared at module scope

    const RBQ_ENDPOINTS = [
        { name: '主线路', url: 'https://gnai.rbq.my' },
        { name: '备用线路', url: 'https://gnai2.rbq.my' },
    ];
    let _rbqSelectedUrl = ''; // Best route URL after testing

    const naiEndpointMode = document.getElementById('st-scene-trigger-nai-endpoint-mode');
    const naiRbqPanel = document.getElementById('st-scene-trigger-nai-rbq-panel');
    const naiRbqInfoText = document.getElementById('st-scene-trigger-nai-rbq-info-text');
    const naiRbqRoutes = document.getElementById('st-scene-trigger-nai-rbq-routes');

    let _activeProbeToken = 0;

    const naiApiKeyInput = document.getElementById('st-scene-trigger-modal-api-key');
    naiApiKeyInput?.addEventListener('input', () => {
        if (naiEndpointMode?.value === 'rbq') {
            _activeProbeToken++;
            _rbqSelectedUrl = '';
            getSettings().naiRbqUrl = '';
            if (naiRbqInfoText) naiRbqInfoText.textContent = '⏳ 请先填写 API Key，然后点击「连接并测速」';
            if (naiRbqRoutes) { naiRbqRoutes.style.display = 'none'; naiRbqRoutes.innerHTML = ''; }
            updateNaiRbqVisibility();
        }
    });

    function updateNaiRbqVisibility() {
        if (getSettings().currentMode !== 'nai') return;
        const mode = naiEndpointMode?.value || 'official';
        const apiKey = document.getElementById('st-scene-trigger-modal-api-key')?.value?.trim();
        const shouldHide = (mode === 'rbq' && (!_rbqSelectedUrl || _rbqSelectedUrl.trim() === '' || !apiKey));
        const isRbqFreeOnly = mode === 'rbq' && _naiIsFreeOnly;

        const modelWrap = document.getElementById('st-scene-trigger-modal-model')?.closest('.st-scene-trigger-field');
        const naiFlowWrap = document.querySelector('.st-scene-trigger-nai-flow');

        if (shouldHide) {
            if (modelWrap) modelWrap.style.display = 'none';
            if (naiFlowWrap) naiFlowWrap.style.display = 'none';
        } else {
            if (modelWrap) modelWrap.style.display = '';
            if (naiFlowWrap) naiFlowWrap.style.display = '';
        }

        // Hide Vibe Transfer & Precise Reference for free-tier users or NAI V5 model
        const modelSelect = document.getElementById('st-scene-trigger-modal-model');
        const connection = getModeConnectionSettings('nai');
        const selectedModel = (modelSelect instanceof HTMLSelectElement && modelSelect.value) ? modelSelect.value : (connection.model || '');
        const isV5 = String(selectedModel || '').toLowerCase().includes('nai-diffusion-5');
        const hideVibeAndPrecise = isV5 || isRbqFreeOnly;

        const vibeSection = document.getElementById('st-scene-trigger-nai-vibe-section');
        const preciseSection = document.getElementById('st-scene-trigger-nai-precise-section');
        if (vibeSection) vibeSection.style.display = hideVibeAndPrecise ? 'none' : '';
        if (preciseSection) preciseSection.style.display = hideVibeAndPrecise ? 'none' : '';
    }

    function toggleNaiEndpointUi() {
        const mode = naiEndpointMode?.value || 'official';
        const isRbq = mode === 'rbq';
        const isCustom = mode === 'custom';
        const isOfficial = mode === 'official';
        if (naiRbqPanel) naiRbqPanel.style.display = isRbq ? 'block' : 'none';

        const keyLabel = document.getElementById('st-scene-trigger-key-label');
        const urlField = document.getElementById('st-scene-trigger-url-field');
        const endpointLabel = document.getElementById('st-scene-trigger-endpoint-label');
        if (getSettings().currentMode === 'nai') {
            // URL field: only show for custom
            if (urlField) urlField.style.display = isCustom ? '' : 'none';
            if (isRbq) {
                if (keyLabel) keyLabel.textContent = 'RBQ API Key';
            } else if (isCustom) {
                if (endpointLabel) endpointLabel.textContent = '自定义接口地址';
                if (keyLabel) keyLabel.textContent = '访问密钥';
                const urlInput = document.getElementById('st-scene-trigger-modal-scheduler-url');
                if (urlInput) urlInput.placeholder = '支持域名或完整接口 (如 /image/chami)';
            } else {
                // official
                if (keyLabel) keyLabel.textContent = 'NAI Token';
            }
        }
        updateNaiRbqVisibility();
        if (typeof enforceNaiMaxArea === 'function') enforceNaiMaxArea('width');
        if (typeof enforceNaiMaxSteps === 'function') enforceNaiMaxSteps();
    }
    _toggleNaiEndpointUi = toggleNaiEndpointUi;

    async function probeOneEndpoint(url, apiKey) {
        const start = performance.now();
        try {
            const res = await fetch(`${url}/user/info`, {
                headers: { 'Authorization': `Bearer ${apiKey}` },
                signal: AbortSignal.timeout(6000),
            });
            const latency = Math.round(performance.now() - start);
            if (!res.ok) return { url, latency, ok: false, error: `HTTP ${res.status}` };
            const data = await res.json();
            return { url, latency, ok: true, data };
        } catch (err) {
            const latency = Math.round(performance.now() - start);
            return { url, latency, ok: false, error: err.message || '超时' };
        }
    }

    const PROBE_COUNT = 10; // 并发测速发 10 个包

    async function probeEndpointMulti(url, apiKey) {
        let userData = null;
        let completedCount = 0;

        // 并发发包
        const promises = Array.from({ length: PROBE_COUNT }).map(async () => {
            const r = await probeOneEndpoint(url, apiKey);
            if (r.ok && !userData) userData = r.data;

            completedCount++;
            if (naiRbqInfoText) {
                const ep = RBQ_ENDPOINTS.find(e => e.url === url);
                naiRbqInfoText.textContent = `⚡ 并发洪水测速 ${ep?.name || url} (${completedCount}/${PROBE_COUNT})...`;
            }
            return r;
        });

        const probes = await Promise.all(promises);

        const okProbes = probes.filter(p => p.ok);
        const failCount = PROBE_COUNT - okProbes.length;
        const lossRate = failCount / PROBE_COUNT;
        const latencies = okProbes.map(p => p.latency);
        return {
            url,
            lossRate,
            lossCount: failCount,
            totalProbes: PROBE_COUNT,
            avgLatency: latencies.length > 0 ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : -1,
            minLatency: latencies.length > 0 ? Math.min(...latencies) : -1,
            maxLatency: latencies.length > 0 ? Math.max(...latencies) : -1,
            reachable: okProbes.length > 0,
            userData,
        };
    }

    function renderRouteResults(results) {
        if (!naiRbqRoutes) return;
        naiRbqRoutes.style.display = 'block';
        naiRbqRoutes.innerHTML = results.map((r, i) => {
            const ep = RBQ_ENDPOINTS[i];
            const isSelected = r.reachable && r.url === _rbqSelectedUrl;
            const lossPct = Math.round(r.lossRate * 100);

            // Loss color: 0% green, 1-30% yellow, >30% red
            const lossColor = lossPct === 0 ? '#4ade80' : lossPct <= 30 ? '#fbbf24' : '#f87171';
            const statusIcon = !r.reachable ? '🔴' : lossPct === 0 ? '🟢' : lossPct <= 30 ? '🟡' : '🔴';
            const latencyColor = r.avgLatency < 0 ? '#f87171' : r.avgLatency < 500 ? '#4ade80' : r.avgLatency < 1200 ? '#fbbf24' : '#f87171';

            const latencyText = r.reachable
                ? `${r.avgLatency}ms (${r.minLatency}~${r.maxLatency})`
                : '不可达';

            const badge = isSelected ? '✅ 已选' : '';

            return `<div style="display:flex; align-items:center; gap:6px; padding:5px 10px; border-radius:6px; background:${isSelected ? 'rgba(74,222,128,.15)' : 'var(--linear-surface)'}; border:1px solid ${isSelected ? 'rgba(74,222,128,.3)' : 'var(--linear-border-standard)'}; margin-bottom:4px; font-size:12px;">
                <span>${statusIcon}</span>
                <span style="min-width:55px; color:var(--linear-text-primary);">${ep.name}</span>
                <span style="min-width:50px; color:${lossColor}; font-weight:600;">丢包 ${lossPct}%</span>
                <span style="flex:1; color:${latencyColor}; font-variant-numeric:tabular-nums;">${latencyText}</span>
                <span style="font-size:10px; color:rgba(74,222,128,.9); font-weight:600;">${badge}</span>
            </div>`;
        }).join('');
    }

    async function rbqConnectAndTest() {
        const apiKey = document.getElementById('st-scene-trigger-modal-api-key')?.value?.trim();
        if (!apiKey) {
            if (naiRbqInfoText) naiRbqInfoText.textContent = '⚠️ 请先在上方填写 RBQ API Key';
            return;
        }
        const connectBtn = document.getElementById('st-scene-trigger-nai-rbq-connect');
        if (connectBtn) connectBtn.disabled = true;
        if (naiRbqInfoText) naiRbqInfoText.textContent = '🔄 正在测速所有线路...';
        if (naiRbqRoutes) { naiRbqRoutes.style.display = 'none'; naiRbqRoutes.innerHTML = ''; }

        // Probe all endpoints (sequential per endpoint to measure loss, parallel across endpoints)
        const results = await Promise.all(RBQ_ENDPOINTS.map(ep => probeEndpointMulti(ep.url, apiKey)));

        // Pick: lowest loss rate first, then lowest avg latency as tiebreaker
        const reachable = results.filter(r => r.reachable);
        if (reachable.length > 0) {
            reachable.sort((a, b) => {
                if (a.lossRate !== b.lossRate) return a.lossRate - b.lossRate;
                return a.avgLatency - b.avgLatency;
            });
            const best = reachable[0];
            _rbqSelectedUrl = best.url;
            _naiIsFreeOnly = !!best.userData?.free_only;

            // Auto-persist so generateImage uses the correct URL immediately
            const settings = getSettings();
            settings.naiUrl = _rbqSelectedUrl;
            settings.naiRbqUrl = _rbqSelectedUrl;
            settings.naiEndpointMode = 'rbq';
            settings.naiApiKey = apiKey;
            saveSettingsDebounced();

            const tierText = _naiIsFreeOnly ? '🆓 免费层 (Opus Free)' : '💎 付费层 (Full Access)';
            const nameText = best.userData?.name ? ` · ${best.userData.name}` : '';
            const poolText = best.userData?.pool_name ? ` · 池: ${best.userData.pool_name}` : '';
            let quotaText = '';
            if (best.userData?.quota_images != null) {
                const remain = Math.max(0, best.userData.quota_images - (best.userData.total_images || 0));
                quotaText = ` · 剩余 ${remain} 张`;
            }
            const routeName = RBQ_ENDPOINTS.find(e => e.url === best.url)?.name || '';
            if (naiRbqInfoText) naiRbqInfoText.textContent = `✅ ${tierText}${nameText}${poolText}${quotaText} · 线路: ${routeName}`;
        } else {
            _rbqSelectedUrl = '';
            _naiIsFreeOnly = true;
            if (naiRbqInfoText) naiRbqInfoText.textContent = '❌ 所有线路均不可用，请检查 API Key 是否正确';
        }

        renderRouteResults(results);
        if (connectBtn) connectBtn.disabled = false;
        updateNaiRbqVisibility();
        if (typeof enforceNaiMaxArea === 'function') enforceNaiMaxArea('width');
        if (typeof enforceNaiMaxSteps === 'function') enforceNaiMaxSteps();
    }

    document.getElementById('st-scene-trigger-nai-rbq-connect')?.addEventListener('click', rbqConnectAndTest);

    naiEndpointMode?.addEventListener('change', () => {
        toggleNaiEndpointUi();
    });

    document.getElementById('st-scene-trigger-modal-model')?.addEventListener('change', updateModelDependentUi);

    // Width/Height slider: enforce maxArea + snap to 64 multiples
    function enforceNaiMaxArea(changedDim) {
        const mode = document.getElementById('st-scene-trigger-nai-endpoint-mode')?.value || 'official';
        const isFree = mode === 'rbq' ? _naiIsFreeOnly : false;
        const maxArea = isFree ? 1048576 : 3354624;

        // Snap to 64 multiples (official NAI requirement)
        let w = Math.round(parseInt(naiWidthInput?.value || 832) / 64) * 64;
        let h = Math.round(parseInt(naiHeightInput?.value || 1216) / 64) * 64;
        w = Math.max(64, w);
        h = Math.max(64, h);

        if (w * h > maxArea) {
            if (changedDim === 'width') {
                h = Math.floor((maxArea / w) / 64) * 64;
                h = Math.max(64, h);
            } else {
                w = Math.floor((maxArea / h) / 64) * 64;
                w = Math.max(64, w);
            }
        }

        // Write back snapped values
        if (naiWidthInput) naiWidthInput.value = w;
        if (naiWidthSlider) naiWidthSlider.value = w;
        if (naiHeightInput) naiHeightInput.value = h;
        if (naiHeightSlider) naiHeightSlider.value = h;

        // Hide large presets for free tier (display:none doesn't work on optgroup)
        const presetSelect = document.getElementById('st-scene-trigger-nai-size-preset');
        if (presetSelect) {
            if (isFree) {
                presetSelect.querySelectorAll('optgroup').forEach(og => {
                    const label = og.label || '';
                    if (label.includes('LARGE') || label.includes('WALLPAPER')) {
                        og.dataset.hidden = '1';
                        og.remove();
                    }
                });
            } else {
                // Restore if previously removed
                if (!presetSelect.querySelector('optgroup[label*="LARGE"]')) {
                    const largeGroup = document.createElement('optgroup');
                    largeGroup.label = 'LARGE (消耗点数)';
                    largeGroup.innerHTML = '<option value="1024x1536">竖图 (1024×1536)</option><option value="1536x1024">横图 (1536×1024)</option><option value="1472x1472">方图 (1472×1472)</option>';
                    presetSelect.appendChild(largeGroup);
                }
                if (!presetSelect.querySelector('optgroup[label*="WALLPAPER"]')) {
                    const wpGroup = document.createElement('optgroup');
                    wpGroup.label = 'WALLPAPER (消耗点数)';
                    wpGroup.innerHTML = '<option value="1088x1920">竖图 (1088×1920)</option><option value="1920x1088">横图 (1920×1088)</option>';
                    presetSelect.appendChild(wpGroup);
                }
            }
        }
    }

    // Steps slider: enforce maxSteps for Opus Free
    function enforceNaiMaxSteps() {
        const mode = document.getElementById('st-scene-trigger-nai-endpoint-mode')?.value || 'official';
        const isFree = mode === 'rbq' ? _naiIsFreeOnly : false;
        const maxSteps = isFree ? 28 : 50;

        const naiSteps = document.getElementById('st-scene-trigger-nai-steps');
        const naiStepsVal = document.getElementById('st-scene-trigger-nai-steps-val');
        if (!naiSteps) return;

        naiSteps.max = maxSteps;
        if (Number(naiSteps.value) > maxSteps) {
            naiSteps.value = maxSteps;
            if (naiStepsVal) naiStepsVal.textContent = maxSteps;
        }
    }

    // Patch the width/height event listeners with area enforcement
    naiWidthSlider?.addEventListener('input', () => enforceNaiMaxArea('width'));
    naiWidthInput?.addEventListener('change', () => enforceNaiMaxArea('width'));
    naiHeightSlider?.addEventListener('input', () => enforceNaiMaxArea('height'));
    naiHeightInput?.addEventListener('change', () => enforceNaiMaxArea('height'));

    // Restore endpoint mode from settings
    const _savedEndpointMode = getSettings().naiEndpointMode || 'official';
    if (naiEndpointMode) naiEndpointMode.value = _savedEndpointMode;

    _rbqSelectedUrl = '';
    toggleNaiEndpointUi();

    const cachedUrl = getSettings().naiRbqUrl || '';
    const cachedApiKey = getSettings().naiApiKey || '';
    if (_savedEndpointMode === 'rbq' && cachedUrl && cachedApiKey) {
        if (naiRbqInfoText) naiRbqInfoText.textContent = '⏳ 正在自动验证凭证...';
        const token = ++_activeProbeToken;
        probeOneEndpoint(cachedUrl, cachedApiKey).then((res) => {
            if (_activeProbeToken !== token || naiEndpointMode?.value !== 'rbq') return;
            if (res.ok) {
                _rbqSelectedUrl = cachedUrl;
                _naiIsFreeOnly = !!res.data?.free_only;
                const tierText = _naiIsFreeOnly ? '🆓 免费层' : '💎 付费层';
                const nameText = res.data?.name ? ` · ${res.data.name}` : '';
                let quotaText = '';
                if (res.data?.quota_images != null) {
                    const remain = Math.max(0, res.data.quota_images - (res.data.total_images || 0));
                    quotaText = ` · 剩余 ${remain} 张`;
                }
                const routeName = RBQ_ENDPOINTS.find(e => e.url === cachedUrl)?.name || '';
                if (naiRbqInfoText) naiRbqInfoText.textContent = `✅ 自动连接: ${tierText}${nameText}${quotaText} · 线路: ${routeName}`;
            } else {
                _rbqSelectedUrl = '';
                getSettings().naiRbqUrl = '';
                if (naiRbqInfoText) naiRbqInfoText.textContent = '❌ 凭证失效或接连超时，请检查 API Key';
            }
            updateNaiRbqVisibility();
            if (typeof enforceNaiMaxArea === 'function') enforceNaiMaxArea('width');
            if (typeof enforceNaiMaxSteps === 'function') enforceNaiMaxSteps();
        }).catch(() => {
            if (_activeProbeToken !== token || naiEndpointMode?.value !== 'rbq') return;
            _rbqSelectedUrl = '';
            if (naiRbqInfoText) naiRbqInfoText.textContent = '❌ 自动验证异常，请手动点击测速';
            updateNaiRbqVisibility();
        });
    }

    document.getElementById('st-scene-trigger-save-settings')?.addEventListener('click', () => {
        saveFromModal();
        toastr.success('\u8bbe\u7f6e\u5df2\u4fdd\u5b58', DISPLAY_NAME);
    });

    document.getElementById('st-scene-trigger-clear-cache')?.addEventListener('click', async () => {
        try {
            await clearImageCache();
            getSettings().history = [];
            saveSettingsDebounced();
            await renderHistory();
            await updateCacheUsageUi();
            await refreshVisibleInlineImages();
            queueExistingMessages();
            toastr.success('缓存已清空', DISPLAY_NAME);
        } catch (error) {
            toastr.error(error.message || String(error), DISPLAY_NAME);
        }
    });

    document.getElementById('st-scene-trigger-clear-old-cache')?.addEventListener('click', async () => {
        try {
            const count = await clearCacheOlderThanDays(7);
            await updateCacheUsageUi();
            await renderHistory();
            toastr.success(`已清理 7 天前的旧图片 (${count} 张)`, DISPLAY_NAME);
        } catch (error) {
            toastr.error(error.message || String(error), DISPLAY_NAME);
        }
    });

    document.getElementById('st-scene-trigger-export-zip')?.addEventListener('click', async () => {
        const btn = document.getElementById('st-scene-trigger-export-zip');
        const orig = btn ? btn.innerHTML : '';
        try {
            if (btn) {
                btn.disabled = true;
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 打包中...';
            }
            toastr.info('正在读取图片并压缩打包，请稍候...', DISPLAY_NAME);
            const count = await exportChatImagesZip();
            toastr.success(`已成功打包导出 ${count} 张高清插画为 ZIP 文件！`, DISPLAY_NAME);
        } catch (error) {
            toastr.error(error.message || String(error), DISPLAY_NAME);
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = orig;
            }
        }
    });

    document.getElementById('st-scene-trigger-comfy-refresh-capabilities')?.addEventListener('click', async () => {
        try {
            saveFromModal();
            await refreshComfyUiCapabilities();
            toastr.success('已获取当前模式的模型与参数', DISPLAY_NAME);
        } catch (error) {
            toastr.error(error.message || String(error), DISPLAY_NAME);
        }
    });

    document.getElementById('st-scene-trigger-comfy-workflow-select')?.addEventListener('change', (event) => {
        getSettings().comfyuiSelectedWorkflow = event.target.value;
        loadSelectedWorkflowIntoEditor();
        saveSettingsDebounced();
    });

    document.getElementById('st-scene-trigger-comfy-workflow-import')?.addEventListener('click', () => {
        document.getElementById('st-scene-trigger-comfy-workflow-import-file')?.click();
    });

    document.getElementById('st-scene-trigger-comfy-workflow-import-file')?.addEventListener('change', async (event) => {
        const input = event.target;
        if (!(input instanceof HTMLInputElement) || !input.files?.length) return;
        try {
            const file = input.files[0];
            let content = '';
            const isPng = /\.png$/i.test(file.name);
            if (isPng) {
                const buffer = await file.arrayBuffer();
                const extracted = extractPngComfyPrompt(buffer);
                if (!extracted) {
                    throw new Error('该 PNG 图片中未检测到 ComfyUI 工作流元数据');
                }
                content = typeof extracted === 'string' ? extracted : JSON.stringify(extracted, null, 2);
            } else {
                content = await file.text();
            }

            let parsed = JSON.parse(content);
            if (parsed && typeof parsed === 'object' && parsed.prompt && typeof parsed.prompt === 'object' && !Array.isArray(parsed.prompt)) {
                parsed = parsed.prompt;
                content = JSON.stringify(parsed, null, 2);
            }

            if (parsed && Array.isArray(parsed.nodes) && Array.isArray(parsed.links)) {
                throw new Error('检测到此文件为 ComfyUI 界面图格式 (UI Graph)，无法直接调用。请在 ComfyUI 设置中开启【Enable Dev mode Options】，然后点击【Save (API format)】导出 API 格式 JSON；或直接导入该工作流生成过的原图 PNG！');
            }

            const suggestedName = file.name.replace(/\.(json|png)$/i, '') || '导入工作流';
            const name = normalizeWorkflowName(window.prompt('请输入导入后的工作流名称', suggestedName));
            if (!name) return;

            const settings = getSettings();
            ensureComfyWorkflowState();

            const mapping = analyzeComfyWorkflowGraph(parsed);

            const workflow = {
                id: createWorkflowId(name),
                name,
                type: 'txt2img',
                json: content,
                mapping: mapping || undefined,
            };
            settings.comfyuiWorkflows.push(workflow);
            settings.comfyuiSelectedWorkflow = workflow.id;
            settings.comfyuiWorkflowJson = workflow.json;
            syncComfyWorkflowEditor();
            saveSettingsDebounced();

            if (mapping && (mapping.positiveNodeId || mapping.samplerNodeId)) {
                toastr.success(`工作流导入成功！已自动识别并绑定：正面词(Node ${mapping.positiveNodeId || '未指定'})、负面词(Node ${mapping.negativeNodeId || '未指定'})、采样器(Node ${mapping.samplerNodeId || '未指定'})`, DISPLAY_NAME);
            } else {
                toastr.success('工作流导入成功', DISPLAY_NAME);
            }
        } catch (error) {
            toastr.error(error.message || String(error), DISPLAY_NAME);
        } finally {
            input.value = '';
        }
    });

    document.getElementById('st-scene-trigger-comfy-workflow-update')?.addEventListener('click', () => {
        try {
            saveSelectedWorkflowJson();
            toastr.success('当前工作流已更新', DISPLAY_NAME);
        } catch (error) {
            toastr.error(error.message || String(error), DISPLAY_NAME);
        }
    });

    document.getElementById('st-scene-trigger-comfy-workflow-save-as')?.addEventListener('click', () => {
        try {
            const settings = getSettings();
            ensureComfyWorkflowState();
            const content = parseWorkflowEditorJson();
            const current = settings.comfyuiWorkflows.find((item) => item.id === settings.comfyuiSelectedWorkflow);
            const suggestedName = current ? `${current.name} 副本` : '新工作流';
            const input = window.prompt('请输入新工作流名称', suggestedName);
            const name = normalizeWorkflowName(input);
            if (!name) return;

            const workflow = {
                id: createWorkflowId(name),
                name,
                type: current?.type || 'txt2img',
                json: content,
            };
            settings.comfyuiWorkflows.push(workflow);
            settings.comfyuiSelectedWorkflow = workflow.id;
            settings.comfyuiWorkflowJson = workflow.json;
            syncComfyWorkflowEditor();
            saveSettingsDebounced();
            toastr.success('已另存为新工作流', DISPLAY_NAME);
        } catch (error) {
            toastr.error(error.message || String(error), DISPLAY_NAME);
        }
    });

    document.getElementById('st-scene-trigger-comfy-workflow-delete')?.addEventListener('click', () => {
        const settings = getSettings();
        ensureComfyWorkflowState();
        const current = settings.comfyuiWorkflows.find((item) => item.id === settings.comfyuiSelectedWorkflow);
        if (!current) {
            toastr.warning('未找到当前工作流', DISPLAY_NAME);
            return;
        }

        const confirmed = window.confirm(`确定删除工作流“${current.name}”吗？`);
        if (!confirmed) return;

        settings.comfyuiWorkflows = settings.comfyuiWorkflows.filter((item) => item.id !== current.id);
        if (!settings.comfyuiWorkflows.length) {
            settings.comfyuiWorkflows = getDefaultComfyWorkflows();
        }
        settings.comfyuiSelectedWorkflow = settings.comfyuiWorkflows[0].id;
        settings.comfyuiWorkflowJson = settings.comfyuiWorkflows[0].json;
        syncComfyWorkflowEditor();
        saveSettingsDebounced();
        toastr.success('工作流已删除', DISPLAY_NAME);
    });

    document.getElementById('st-scene-trigger-test')?.addEventListener('click', async () => {
        const prompt = document.getElementById('st-scene-trigger-test-prompt')?.value?.trim();
        if (!prompt) {
            toastr.warning('\u8bf7\u5148\u8f93\u5165\u6d4b\u8bd5\u63d0\u793a\u8bcd', DISPLAY_NAME);
            return;
        }
        const resultDiv = document.getElementById('st-scene-trigger-test-result');
        const btn = document.getElementById('st-scene-trigger-test');
        try {
            if (btn) btn.disabled = true;
            if (resultDiv) resultDiv.innerHTML = '<span style="color: var(--linear-text-muted); font-size: 14px;"><i class="fa-solid fa-spinner fa-spin"></i> 正在生成中...</span>';

            saveFromModal();
            const result = await generateImage(prompt, 'test');
            toastr.success('测试生成完成', DISPLAY_NAME);

            if (resultDiv && result && result.url) {
                resultDiv.innerHTML = `<img src="${escapeHtml(result.url)}" style="max-width: 100%; max-height: 400px; border-radius: 8px; box-shadow: rgba(0,0,0,0.5) 0px 4px 12px; cursor: pointer;" class="st-scene-trigger-test-img" data-url="${escapeHtml(result.url)}" data-prompt="${escapeHtml(result.prompt || prompt)}" data-cache-id="${escapeHtml(result.cacheId || '')}">`;
            } else if (resultDiv) {
                resultDiv.innerHTML = '<span style="color: #e05252; font-size: 14px;">生成失败: 未返回图像 URL</span>';
            }
        } catch (error) {
            toastr.error(error.message || String(error), DISPLAY_NAME);
            if (resultDiv) resultDiv.innerHTML = `<span style="color: #e05252; font-size: 14px;">错误: ${escapeHtml(error.message || String(error))}</span>`;
            setStatus(getSettings().enabled ? '已启用' : '已停用');
        } finally {
            if (btn) btn.disabled = false;
        }
    });

    document.getElementById('st-scene-trigger-test-llm')?.addEventListener('click', async () => {
        const prompt = document.getElementById('st-scene-trigger-test-prompt')?.value?.trim();
        if (!prompt) {
            toastr.warning('请先输入测试提示词', DISPLAY_NAME);
            return;
        }
        if (typeof window.RBQ?.api?.generateWithTagger !== 'function') {
            toastr.warning('未检测到智能生图触发器插件或插件未启用', DISPLAY_NAME);
            return;
        }
        const resultDiv = document.getElementById('st-scene-trigger-test-result');
        const btn = document.getElementById('st-scene-trigger-test-llm');
        try {
            if (btn) {
                btn.disabled = true;
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> tagger 分析中...';
            }
            if (resultDiv) resultDiv.innerHTML = '<span style="color: var(--linear-text-muted); font-size: 14px;"><i class="fa-solid fa-spinner fa-spin"></i> 正在调用 Tagger API 分析...</span>';

            saveFromModal();
            const result = await window.RBQ.api.generateWithTagger(prompt, (progressText) => {
                if (resultDiv) resultDiv.innerHTML = `<span style="color: var(--linear-text-muted); font-size: 14px;"><i class="fa-solid fa-spinner fa-spin"></i> ${progressText}</span>`;
            });
            toastr.success('智能测试生成完成', DISPLAY_NAME);

            if (resultDiv && result && result.url) {
                resultDiv.innerHTML = `<img src="${escapeHtml(result.url)}" style="max-width: 100%; max-height: 400px; border-radius: 8px; box-shadow: rgba(0,0,0,0.5) 0px 4px 12px; cursor: pointer;" class="st-scene-trigger-test-img" data-url="${escapeHtml(result.url)}" data-prompt="${escapeHtml(result.prompt || prompt)}" data-cache-id="${escapeHtml(result.cacheId || '')}">`;
            } else if (resultDiv) {
                resultDiv.innerHTML = '<span style="color: #e05252; font-size: 14px;">生成失败: 未返回图像 URL</span>';
            }
        } catch (error) {
            toastr.error(error.message || String(error), DISPLAY_NAME);
            if (resultDiv) resultDiv.innerHTML = `<span style="color: #e05252; font-size: 14px;">错误: ${escapeHtml(error.message || String(error))}</span>`;
            setStatus(getSettings().enabled ? '已启用' : '已停用');
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> 智能测试生成';
            }
        }
    });

    document.getElementById('st-scene-trigger-nai-capability-check')?.addEventListener('click', async () => {
        try {
            saveFromModal();
            await probeNaiEncodeCapability(true);
            if (naiCapabilityState.encodeVibe === 'supported') {
                toastr.success('已检测到 Encode-Vibe 高级能力', DISPLAY_NAME);
            } else if (naiCapabilityState.encodeVibe === 'unsupported') {
                toastr.warning('当前后端不支持 Encode-Vibe，仍可导入 .naiv4vibe 使用', DISPLAY_NAME);
            } else {
                toastr.info('高级能力检测已完成，请查看状态说明', DISPLAY_NAME);
            }
        } catch (error) {
            toastr.error(error.message || String(error), DISPLAY_NAME);
        }
    });

    const vibeFileInput = document.createElement('input');
    vibeFileInput.type = 'file';
    vibeFileInput.accept = 'image/*,.naiv4vibe,application/json';
    vibeFileInput.hidden = true;
    vibeFileInput.id = 'st-scene-trigger-nai-vibe-file-input';
    document.body.append(vibeFileInput);

    const preciseFileInput = document.createElement('input');
    preciseFileInput.type = 'file';
    preciseFileInput.accept = 'image/*';
    preciseFileInput.hidden = true;
    preciseFileInput.id = 'st-scene-trigger-nai-precise-file-input';
    document.body.append(preciseFileInput);

    document.getElementById('st-scene-trigger-nai-add-vibe')?.addEventListener('click', () => {
        vibeFileInput.click();
    });

    vibeFileInput.addEventListener('change', async () => {
        const file = vibeFileInput.files?.[0];
        vibeFileInput.value = '';
        if (!file) return;
        try {
            if (/\.naiv4vibe$|\.json$/i.test(file.name)) {
                const data = JSON.parse(await file.text());
                if (data.identifier !== 'novelai-vibe-transfer') {
                    throw new Error('无效的 .naiv4vibe 文件格式');
                }
                // Traverse all encoding keys (v4full, v4-5curated, v4-5full, etc.)
                let encoding = null;
                if (data.encodings) {
                    for (const modelKey in data.encodings) {
                        for (const hashKey in data.encodings[modelKey]) {
                            const encObj = data.encodings[modelKey][hashKey];
                            if (encObj?.encoding) {
                                encoding = encObj;
                                break;
                            }
                        }
                        if (encoding) break;
                    }
                }
                if (!encoding?.encoding) {
                    throw new Error('未在 .naiv4vibe 文件中找到有效特征数据');
                }
                const imageB64 = String(data.image || data.thumbnail || '').replace(/^data:image\/[^;]+;base64,/, '');
                const added = addNaiVibe(imageB64, {
                    tensor: encoding.encoding,
                    info: encoding.params?.information_extracted || 1,
                });
                if (!added) throw new Error('当前已启用精准参考，或氛围图数量已达上限');
            } else {
                const b64 = await fileToBase64Simple(file);
                if (!addNaiVibe(b64)) {
                    throw new Error('当前已启用精准参考，或氛围图数量已达上限');
                }
            }
            renderNaiAdvancedDecks();
        } catch (error) {
            toastr.error(`氛围图加载失败: ${error.message || String(error)}`, DISPLAY_NAME);
        }
    });

    document.getElementById('st-scene-trigger-nai-add-precise')?.addEventListener('click', () => {
        preciseFileInput.click();
    });

    preciseFileInput.addEventListener('change', async () => {
        const file = preciseFileInput.files?.[0];
        preciseFileInput.value = '';
        if (!file) return;
        try {
            const b64 = await resizeImageForPreciseRef(file);
            if (!addNaiPreciseRef(b64)) {
                throw new Error('当前已启用 Vibe，或精准参考数量已达上限');
            }
            renderNaiAdvancedDecks();
        } catch (error) {
            toastr.error(`精准参考图加载失败: ${error.message || String(error)}`, DISPLAY_NAME);
        }
    });

    document.querySelector('.st-scene-trigger-modal-main')?.addEventListener('click', (event) => {
        const target = event.target.closest('[data-action]');
        if (!target) return;
        const action = target.dataset.action;
        const id = target.dataset.id;
        if (action === 'remove-vibe') {
            removeNaiVibe(id);
            renderNaiAdvancedDecks();
        } else if (action === 'remove-precise') {
            removeNaiPreciseRef(id);
            renderNaiAdvancedDecks();
        } else if (action === 'extract-vibe') {
            void extractNaiVibe(id).then(() => renderNaiAdvancedDecks());
        } else if (action === 'download-vibe') {
            downloadNaiVibe(id);
        }
    });

    document.querySelector('.st-scene-trigger-modal-main')?.addEventListener('input', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;
        const action = target.dataset.action;
        const id = target.dataset.id;
        if (action === 'vibe-strength') {
            const item = naiVibes.find((entry) => entry.id === id);
            if (item) {
                item.strength = Number(target.value);
                target.closest('label')?.querySelector('em')?.replaceChildren(document.createTextNode(target.value));
                persistNaiAdvancedState();
            }
        } else if (action === 'vibe-info') {
            const item = naiVibes.find((entry) => entry.id === id);
            if (item) {
                item.info = Number(target.value);
                target.closest('label')?.querySelector('em')?.replaceChildren(document.createTextNode(target.value));
                persistNaiAdvancedState();
            }
        } else if (action === 'precise-strength') {
            const item = naiPreciseRefs.find((entry) => entry.id === id);
            if (item) {
                item.strength = Number(target.value);
                target.closest('label')?.querySelector('em')?.replaceChildren(document.createTextNode(target.value));
                persistNaiAdvancedState();
            }
        } else if (action === 'precise-info') {
            const item = naiPreciseRefs.find((entry) => entry.id === id);
            if (item) {
                item.info = Number(target.value);
                target.closest('label')?.querySelector('em')?.replaceChildren(document.createTextNode(target.value));
                persistNaiAdvancedState();
            }
        }
    });

    document.querySelector('.st-scene-trigger-modal-main')?.addEventListener('change', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;
        if (target instanceof HTMLSelectElement && target.dataset.action === 'precise-type') {
            const item = naiPreciseRefs.find((entry) => entry.id === target.dataset.id);
            if (item) {
                item.type = target.value;
                persistNaiAdvancedState();
            }
            return;
        }

        if (target.dataset.action) return;

        const shouldAutoSave = (
            target instanceof HTMLInputElement
            || target instanceof HTMLSelectElement
        );

        if (shouldAutoSave) {
            saveFromModal();
        }
    });

    const testLlmBtn = document.getElementById('st-scene-trigger-test-llm');
    if (testLlmBtn) {
        testLlmBtn.style.display = typeof window.RBQ?.api?.generateWithTagger === 'function' ? 'inline-block' : 'none';
    }

    repopulateGlobalProfileSelect();
}

function mountOptionsEntry() {
    const menu = document.querySelector('#options .options-content');
    if (!(menu instanceof HTMLElement) || document.getElementById('option_st_scene_trigger')) return;

    const item = document.createElement('a');
    item.id = 'option_st_scene_trigger';
    item.innerHTML = '<i class="fa-lg fa-solid fa-paper-plane"></i><span>RBQ生图</span>';
    item.addEventListener('click', (event) => {
        event.preventDefault();
        const options = document.getElementById('options');
        if (options) options.style.display = 'none';
        setModalOpen(true);
        switchTab('general');
        syncUi();
    });

    menu.insertBefore(item, document.getElementById('option_back_to_main') || menu.firstChild);
}

const resolvePluginJsUrl = (repoUrl, mainPath) => {
    if (mainPath.startsWith('http')) return mainPath;
    const basePath = repoUrl.substring(0, repoUrl.lastIndexOf('/'));
    return `${basePath}/${mainPath}`;
};

const appendPluginCacheBust = (url) => {
    const stamp = `rbq_ts=${Date.now()}`;
    const hashIndex = String(url || '').indexOf('#');
    const base = hashIndex >= 0 ? url.slice(0, hashIndex) : String(url || '');
    const hash = hashIndex >= 0 ? url.slice(hashIndex) : '';
    return `${base}${base.includes('?') ? '&' : '?'}${stamp}${hash}`;
};

async function autoUpdateInstalledPlugins() {
    try {
        const settings = window.RBQ?.api?.getSettings?.() || getSettings();
        const installed = settings._plugins || {};
        const installedIds = Object.keys(installed).filter(id => installed[id] && installed[id].enabled && installed[id].code);
        if (installedIds.length === 0) return;

        const repoInput = document.getElementById('st-scene-trigger-plugin-repo');
        const repoUrl = (repoInput?.value || '').trim() || 'https://raw.githubusercontent.com/TTWParty/RBQ-Draw-Plugins/main/plugins.json';
        const indexUrl = appendPluginCacheBust(repoUrl);

        const res = await fetch(indexUrl, { cache: 'no-store' });
        if (!res.ok) return;
        const repoPlugins = await res.json();
        if (!Array.isArray(repoPlugins)) return;

        let updatedCount = 0;
        for (const repoPlugin of repoPlugins) {
            const cur = installed[repoPlugin.id];
            if (!cur) continue;
            if (cur.version !== repoPlugin.version) {
                console.info(`[RBQ Plugin Auto-Update] 检测到插件新版本: ${repoPlugin.id} (当前 v${cur.version} ➔ 远程 v${repoPlugin.version})，正在静默后台热更新...`);
                const jsUrl = appendPluginCacheBust(resolvePluginJsUrl(repoUrl, repoPlugin.main));
                const jsRes = await fetch(jsUrl, { cache: 'no-store' });
                if (!jsRes.ok) continue;
                const newCode = await jsRes.text();

                // 释放旧插件实例
                try {
                    window.RBQ?.cleanupPlugin?.(repoPlugin.id);
                } catch (cleanupErr) {
                    console.warn(`[RBQ Plugin Auto-Update] 清理旧插件 ${repoPlugin.id} 告警:`, cleanupErr);
                }

                // 保存新版本与代码
                settings._plugins[repoPlugin.id] = {
                    version: repoPlugin.version,
                    enabled: true,
                    code: newCode
                };
                window.RBQ?.api?.saveSettings?.();

                // 热重载新插件
                try {
                    const runner = new Function('RBQ', 'jQuery', 'toastr', newCode);
                    runner(window.RBQ, $, toastr);
                    console.info(`[RBQ Plugin Auto-Update] ✅ 插件 ${repoPlugin.name} (v${repoPlugin.version}) 已自动热重载生效`);
                    updatedCount++;
                } catch (loadErr) {
                    console.error(`[RBQ Plugin Auto-Update] ❌ 插件 ${repoPlugin.id} 热重载异常:`, loadErr);
                }
            }
        }
        if (updatedCount > 0) {
            toastr.success(`已自动将 ${updatedCount} 个插件热更新至最新版本`, 'RBQ 插件生态');
        }
    } catch (e) {
        console.warn('[RBQ Plugin Auto-Update] 检查插件自动更新失败:', e);
    }
}

function initPluginManager() {
    const refreshBtn = document.getElementById('st-scene-trigger-plugin-refresh');
    const repoInput = document.getElementById('st-scene-trigger-plugin-repo');
    const channelSelect = document.getElementById('st-scene-trigger-plugin-channel');
    const listContainer = document.getElementById('st-scene-trigger-plugin-list');

    if (!refreshBtn || !repoInput || !listContainer) return;

    if (channelSelect) {
        channelSelect.addEventListener('change', () => {
            repoInput.value = channelSelect.value;
            renderList();
        });
        repoInput.addEventListener('input', () => {
            if (repoInput.value.includes('/beta/')) {
                channelSelect.value = 'https://raw.githubusercontent.com/TTWParty/RBQ-Draw-Plugins/beta/plugins.json';
            } else if (repoInput.value.includes('/main/')) {
                channelSelect.value = 'https://raw.githubusercontent.com/TTWParty/RBQ-Draw-Plugins/main/plugins.json';
            }
        });
    }

    const renderList = async () => {
        try {
            refreshBtn.disabled = true;
            refreshBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 刷新中';
            listContainer.innerHTML = '<div style="text-align:center; padding:12px; color:var(--linear-text-muted);">获取插件列表中...</div>';

            const repoUrl = repoInput.value.trim();
            if (!repoUrl) throw new Error('仓库源地址不能为空');

            const indexUrl = appendCacheBust(repoUrl);
            const res = await fetch(indexUrl, { cache: 'no-store' });
            if (!res.ok) throw new Error(`获取仓库索引失败 (${res.status})`);
            const plugins = await res.json();

            if (!Array.isArray(plugins)) throw new Error('仓库格式错误');

            const settings = window.RBQ.api.getSettings();
            const installed = settings._plugins || {};

            listContainer.innerHTML = '';

            if (plugins.length === 0) {
                listContainer.innerHTML = '<div style="text-align:center; padding:12px; color:var(--linear-text-muted);">源仓库中没有插件。</div>';
                return;
            }

            for (const repoPlugin of plugins) {
                const isInstalled = !!installed[repoPlugin.id];
                const installedVersion = isInstalled ? installed[repoPlugin.id].version : null;
                const hasUpdate = isInstalled && installedVersion !== repoPlugin.version;

                const card = document.createElement('div');
                card.className = 'st-scene-trigger-plugin-card';

                const header = document.createElement('div');
                header.className = 'st-scene-trigger-plugin-card-header';

                const titleBlock = document.createElement('div');
                titleBlock.className = 'st-scene-trigger-plugin-title-wrap';
                titleBlock.innerHTML = `<strong class="st-scene-trigger-plugin-name" style="font-size:14px; color:var(--linear-text-primary);">${repoPlugin.name}</strong> <span class="st-scene-trigger-plugin-ver" style="font-size:11px; color:var(--linear-text-muted);">v${repoPlugin.version}</span>`;

                const authorBlock = document.createElement('div');
                authorBlock.className = 'st-scene-trigger-plugin-author-wrap';
                authorBlock.innerHTML = `<span class="st-scene-trigger-plugin-author" style="font-size:11px; color:var(--linear-text-muted);"><i class="fa-solid fa-user"></i> ${repoPlugin.author || '佚名'}</span>`;

                const descBlock = document.createElement('div');
                descBlock.className = 'st-scene-trigger-plugin-desc';
                descBlock.style.cssText = 'font-size:12px; color:var(--linear-text-secondary); line-height:1.4;';
                descBlock.textContent = repoPlugin.description || '无介绍';

                const actionBlock = document.createElement('div');
                actionBlock.className = 'st-scene-trigger-plugin-card-actions';

                if (isInstalled) {
                    if (hasUpdate) {
                        const btnUpdate = document.createElement('button');
                        btnUpdate.className = 'menu_button st-scene-trigger-icon-button st-scene-trigger-btn-warning';
                        btnUpdate.style.padding = '4px 10px';
                        btnUpdate.style.fontSize = '12px';
                        btnUpdate.innerHTML = '<i class="fa-solid fa-download"></i> 更新 (' + installedVersion + ' ➔ ' + repoPlugin.version + ')';
                        btnUpdate.onclick = () => handleInstall(repoUrl, repoPlugin, btnUpdate);
                        actionBlock.append(btnUpdate);
                    }
                    const btnUninst = document.createElement('button');
                    btnUninst.className = 'menu_button st-scene-trigger-icon-button st-scene-trigger-btn-danger';
                    btnUninst.style.padding = '4px 10px';
                    btnUninst.style.fontSize = '12px';
                    btnUninst.innerHTML = '<i class="fa-solid fa-trash"></i> 卸载';
                    btnUninst.onclick = () => handleUninstall(repoPlugin.id);
                    actionBlock.append(btnUninst);
                } else {
                    const btnInst = document.createElement('button');
                    btnInst.className = 'menu_button st-scene-trigger-icon-button st-scene-trigger-btn-primary';
                    btnInst.style.padding = '4px 10px';
                    btnInst.style.fontSize = '12px';
                    btnInst.innerHTML = '<i class="fa-solid fa-download"></i> 安装';
                    btnInst.onclick = () => handleInstall(repoUrl, repoPlugin, btnInst);
                    actionBlock.append(btnInst);
                }
                header.append(titleBlock, authorBlock);
                card.append(header, descBlock, actionBlock);
                listContainer.append(card);
            }
        } catch (e) {
            listContainer.innerHTML = `<div style="text-align:center; padding:12px; color:#ff4444;"><i class="fa-solid fa-circle-exclamation"></i> ${e.message}</div>`;
        } finally {
            refreshBtn.disabled = false;
            refreshBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> 刷新';
        }
    };

    const resolveJsUrl = resolvePluginJsUrl;
    const appendCacheBust = appendPluginCacheBust;

    const handleInstall = async (baseUrl, pluginData, btn) => {
        try {
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 下载中...';
            const jsUrl = appendCacheBust(resolveJsUrl(baseUrl, pluginData.main));

            const res = await fetch(jsUrl, { cache: 'no-store' });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const code = await res.text();

            // 若该插件先前已加载并注册了清理器，先执行清理以释放旧资源
            try {
                window.RBQ.cleanupPlugin(pluginData.id);
            } catch (cleanupErr) {
                console.warn(`[RBQ Marketplace] Cleanup error on upgrading ${pluginData.id}:`, cleanupErr);
            }

            const settings = window.RBQ.api.getSettings();
            if (!settings._plugins) settings._plugins = {};
            settings._plugins[pluginData.id] = {
                version: pluginData.version,
                enabled: true,
                code: code
            };
            window.RBQ.api.saveSettings();
            toastr.success(`插件 ${pluginData.name} (v${pluginData.version}) 下载并保存成功。请刷新网页使其生效。`);
            renderList();
        } catch (e) {
            console.error('Plugin install error:', e);
            toastr.error(`安装失败: ${e.message}`);
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> 重试';
        }
    };

    const handleUninstall = (id) => {
        // 先调用插件注册的清理器（断开 Observer、移除事件、清除定时器与动态面板）
        try {
            window.RBQ.cleanupPlugin(id);
        } catch (cleanupErr) {
            console.warn(`[RBQ Marketplace] Cleanup error on uninstalling ${id}:`, cleanupErr);
        }
        const settings = window.RBQ.api.getSettings();
        if (settings._plugins && settings._plugins[id]) {
            delete settings._plugins[id];
            window.RBQ.api.saveSettings();
            toastr.success(`成功卸载并清除插件。`);
            renderList();
        }
    };

    refreshBtn.addEventListener('click', renderList);
}

/**
 * 版本比较：比较两个 semver 版本字符串
 * @returns {number} 正数表示 a > b，负数表示 a < b，0 表示相等
 */
function compareVersions(a, b) {
    const pa = String(a || '0').replace(/^[^0-9]+/, '').split('.').map(Number);
    const pb = String(b || '0').replace(/^[^0-9]+/, '').split('.').map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        const na = pa[i] || 0;
        const nb = pb[i] || 0;
        if (na !== nb) return na - nb;
    }
    return 0;
}

let _cachedRemoteUpdateInfo = null;

function renderInlineMarkdown(text) {
    let escaped = escapeHtml(text);
    escaped = escaped.replace(/`([^`]+)`/g, '<code>$1</code>');
    escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    return escaped;
}

function getCategoryBadgeClass(headerText) {
    if (/新功能|功能|特性|新增|feat|🎨|✨|🚀/i.test(headerText)) return 'cat-feat';
    if (/修复|修补|解决|稳定|fix|🩹|🪲|🐛/i.test(headerText)) return 'cat-fix';
    if (/优化|性能|体验|打磨|交互|opt|perf|⚡|💫/i.test(headerText)) return 'cat-opt';
    if (/接口|插件|API|hook|开发|🧩|🔌/i.test(headerText)) return 'cat-api';
    return 'cat-default';
}

function formatChangelogHtml(rawContent) {
    if (!rawContent) return '<p style="color:var(--linear-text-muted);">暂无详细更新日志</p>';
    if (typeof rawContent !== 'string') {
        if (Array.isArray(rawContent)) {
            return `<ul class="st-scene-trigger-update-list">${rawContent.map(item => `<li>${renderInlineMarkdown(String(item))}</li>`).join('')}</ul>`;
        }
        rawContent = JSON.stringify(rawContent, null, 2);
    }

    const lines = rawContent.split('\n');
    let html = '';
    let inList = false;
    let inCodeBlock = false;
    let codeBlockContent = [];

    const closeList = () => {
        if (inList) {
            html += '</ul>';
            inList = false;
        }
    };

    const closeCodeBlock = () => {
        if (inCodeBlock) {
            html += `<pre><code>${escapeHtml(codeBlockContent.join('\n'))}</code></pre>`;
            codeBlockContent = [];
            inCodeBlock = false;
        }
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        if (trimmed.startsWith('```')) {
            if (inCodeBlock) {
                closeCodeBlock();
            } else {
                closeList();
                inCodeBlock = true;
                codeBlockContent = [];
            }
            continue;
        }

        if (inCodeBlock) {
            codeBlockContent.push(line);
            continue;
        }

        if (!trimmed) {
            closeList();
            continue;
        }

        const isVersionHeader = /^#{1,3}\s*(?:🔖\s*)?版本\s*v?([0-9]+\.[0-9]+.*)$/i.test(trimmed)
            || /^#{1,3}\s*v([0-9]+\.[0-9]+.*)$/i.test(trimmed);
        if (isVersionHeader) {
            closeList();
            const verMatch = trimmed.match(/([0-9]+\.[0-9]+[0-9a-zA-Z._-]*)/i);
            const verStr = verMatch ? verMatch[1] : trimmed;
            html += `
                <div class="st-scene-trigger-update-version-section">
                    <span class="st-scene-trigger-update-version-pill"><i class="fa-solid fa-code-branch"></i> v${escapeHtml(verStr)}</span>
                    <span class="st-scene-trigger-update-version-line"></span>
                </div>
            `;
            continue;
        }

        const isHeader = /^([🎨🩹⚡🧩✨🚀🪲🐛🔌🛠️💫💡🔧🔨📌#].*|新功能.*|修复.*|优化.*|新增.*|特性.*)$/u.test(trimmed)
            && !trimmed.startsWith('•')
            && !trimmed.startsWith('-')
            && !trimmed.startsWith('—')
            && !trimmed.startsWith('*');
        if (isHeader) {
            closeList();
            const headerText = trimmed.replace(/^#+\s*/, '');
            const badgeClass = getCategoryBadgeClass(headerText);
            html += `<div class="st-scene-trigger-update-section-title"><span class="st-scene-trigger-update-cat-badge ${badgeClass}">${escapeHtml(headerText)}</span></div>`;
            continue;
        }

        if (/^[•\-\*—]\s*/.test(trimmed)) {
            if (!inList) {
                html += '<ul class="st-scene-trigger-update-list">';
                inList = true;
            }
            const itemText = trimmed.replace(/^[•\-\*—]\s*/, '');
            html += `<li>${renderInlineMarkdown(itemText)}</li>`;
            continue;
        }

        closeList();
        html += `<p style="margin: 4px 0 8px;">${renderInlineMarkdown(trimmed)}</p>`;
    }

    closeList();
    closeCodeBlock();
    return html;
}

function showUpdateModal(remoteVersion, changelog, onConfirmUpdate) {
    let modal = document.getElementById('st-scene-trigger-update-modal');
    if (!modal) {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="st-scene-trigger-update-modal" class="st-scene-trigger-update-modal">
                <div class="st-scene-trigger-update-backdrop"></div>
                <div class="st-scene-trigger-update-dialog">
                    <div class="st-scene-trigger-update-header">
                        <div class="st-scene-trigger-update-brand">
                            <i class="fa-solid fa-satellite-dish"></i>
                            <span>RBQ 生图扩展 · 版本更新</span>
                        </div>
                        <div class="st-scene-trigger-update-title-row">
                            <h3 class="st-scene-trigger-update-title" id="st-scene-trigger-update-version-title"></h3>
                            <span class="st-scene-trigger-update-current" id="st-scene-trigger-update-current-title"></span>
                        </div>
                    </div>
                    <div class="st-scene-trigger-update-body" id="st-scene-trigger-update-content"></div>
                    <div class="st-scene-trigger-update-status" id="st-scene-trigger-update-status-msg" style="display:none;"></div>
                    <div class="st-scene-trigger-update-footer">
                        <button id="st-scene-trigger-update-confirm" class="st-scene-trigger-update-btn primary" type="button">
                            <i class="fa-solid fa-arrow-down-to-bracket"></i> 立即更新
                        </button>
                        <button id="st-scene-trigger-update-cancel" class="st-scene-trigger-update-btn secondary" type="button">稍后再说</button>
                    </div>
                </div>
            </div>
        `);
        modal = document.getElementById('st-scene-trigger-update-modal');
        modal.querySelector('.st-scene-trigger-update-backdrop')?.addEventListener('click', closeUpdateModal);
        modal.querySelector('#st-scene-trigger-update-cancel')?.addEventListener('click', closeUpdateModal);
    }

    const titleEl = document.getElementById('st-scene-trigger-update-version-title');
    const currentEl = document.getElementById('st-scene-trigger-update-current-title');
    const contentEl = document.getElementById('st-scene-trigger-update-content');
    const confirmBtn = document.getElementById('st-scene-trigger-update-confirm');
    const cancelBtn = document.getElementById('st-scene-trigger-update-cancel');
    const statusMsg = document.getElementById('st-scene-trigger-update-status-msg');

    const cleanVer = String(remoteVersion || '').replace(/^v/, '');
    if (titleEl) titleEl.innerText = `v${cleanVer}`;
    if (currentEl) currentEl.innerText = `当前版本: v${LOCAL_VERSION}`;
    if (contentEl) contentEl.innerHTML = formatChangelogHtml(changelog);
    if (statusMsg) {
        statusMsg.style.display = 'none';
        statusMsg.innerHTML = '';
    }

    if (confirmBtn) {
        confirmBtn.disabled = false;
        confirmBtn.className = 'st-scene-trigger-update-btn primary';
        confirmBtn.innerHTML = '<i class="fa-solid fa-arrow-down-to-bracket"></i> 立即更新';
        confirmBtn.onclick = async () => {
            if (typeof onConfirmUpdate === 'function') {
                await onConfirmUpdate({ modal, confirmBtn, cancelBtn, statusMsg });
            }
        };
    }

    if (cancelBtn) {
        cancelBtn.style.display = 'inline-flex';
        cancelBtn.innerText = '稍后再说';
        cancelBtn.onclick = closeUpdateModal;
    }

    modal.classList.add('open');
}

function closeUpdateModal() {
    const modal = document.getElementById('st-scene-trigger-update-modal');
    if (modal) {
        modal.classList.remove('open');
    }
}

async function executeExtensionUpdate({ confirmBtn, cancelBtn, statusMsg }) {
    if (confirmBtn) {
        confirmBtn.disabled = true;
        confirmBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 更新中...';
    }
    if (cancelBtn) {
        cancelBtn.style.display = 'none';
    }

    try {
        const detected = getExtensionFolderName();
        const candidates = [
            detected,
            'RBQ-Draw-Source',
            'st-scene-trigger',
            'SillyTavern-RBQ-Draw',
            'st_scene_trigger',
            'st-rbq-draw',
            'RBQ-Draw-Source-main',
            'st-scene-trigger-main',
            'SillyTavern-RBQ-Draw-main',
        ].filter((val, idx, arr) => val && arr.indexOf(val) === idx);

        let result = null;
        let lastError = null;

        const isProbablyGlobal = String(import.meta.url || '').includes('/scripts/extensions/third-party/');
        const globalScopes = isProbablyGlobal ? [true, false] : [false, true];

        outerLoop:
        for (const folderName of candidates) {
            for (const isGlobal of globalScopes) {
                try {
                    console.info(`[RBQ] 尝试更新扩展目录: "${folderName}" (global: ${isGlobal})`);
                    result = await $.ajax({
                        type: 'POST',
                        url: '/api/extensions/update',
                        data: JSON.stringify({ extensionName: folderName, global: isGlobal }),
                        contentType: 'application/json'
                    });
                    console.info(`[RBQ] 扩展目录 "${folderName}" (global: ${isGlobal}) 更新成功:`, result);
                    lastError = null;
                    break outerLoop;
                } catch (err) {
                    lastError = err;
                    if (err.status === 404 || err.status === 500 || err.status === 403 || err.responseJSON?.error?.includes?.('Not found') || String(err.responseText || '').includes('does not exist')) {
                        console.warn(`[RBQ] 扩展目录 "${folderName}" (global: ${isGlobal}) 404/未找到，尝试下一个组合...`);
                        continue;
                    }
                    throw err;
                }
            }
        }

        if (lastError && !result) {
            throw lastError;
        }

        if (confirmBtn) {
            confirmBtn.disabled = false;
            confirmBtn.className = 'st-scene-trigger-update-btn success';
            confirmBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> 立即刷新';
            confirmBtn.onclick = () => location.reload();
        }

        if (statusMsg) {
            statusMsg.style.display = 'block';
            statusMsg.innerHTML = '<span style="color:#86efac;"><i class="fa-solid fa-circle-check"></i> 更新成功！请刷新页面以生效。</span>';
        }

        if (cancelBtn) {
            cancelBtn.style.display = 'inline-flex';
            cancelBtn.innerText = '稍后刷新';
            cancelBtn.onclick = closeUpdateModal;
        }

        const bar = document.getElementById('st-scene-trigger-update-bar');
        if (bar) {
            bar.style.background = 'rgba(76, 175, 80, 0.12)';
            bar.style.borderColor = 'rgba(76, 175, 80, 0.35)';
            bar.innerHTML = `
                <span style="flex:1; color:#a5d6a7;">
                    <i class="fa-solid fa-check-circle" style="margin-right:4px;"></i>
                    更新成功！请<strong>刷新页面</strong>以加载新版本。
                </span>
                <button onclick="location.reload()" class="menu_button" style="
                    padding: 2px 12px; font-size: 12px; border-radius: 4px;
                    background: rgba(76, 175, 80, 0.2); color: #a5d6a7;
                    border: 1px solid rgba(76, 175, 80, 0.4); cursor: pointer;
                ">刷新</button>
            `;
        }
    } catch (error) {
        console.error('[RBQ] Update failed:', error);
        if (confirmBtn) {
            confirmBtn.disabled = false;
            confirmBtn.innerHTML = '重试';
        }
        if (cancelBtn) {
            cancelBtn.style.display = 'inline-flex';
        }
        let msg = error.status ? `HTTP ${error.status} ${error.statusText}` : error.message;
        if (error.status === 404) {
            msg += ' (扩展目录不存在或未使用Git安装)';
        } else if (error.status === 403) {
            msg += ' (权限不足，全局扩展需要管理员权限)';
        }
        if (statusMsg) {
            statusMsg.style.display = 'block';
            statusMsg.innerHTML = `<span style="color:#f87171;"><i class="fa-solid fa-circle-xmark"></i> 更新失败: ${escapeHtml(msg)}</span>`;
        }
        toastr.error(`更新失败: ${msg}`, DISPLAY_NAME);
    }
}

/**
 * 检查远程仓库是否有新版本
 * @param {boolean} isManual 是否为手动点击触发（手动点击时若有更新则直接弹窗，无更新则提示已是最新）
 */
async function checkForUpdate(isManual = false) {
    const bar = document.getElementById('st-scene-trigger-update-bar');
    const topbarText = document.getElementById('st-scene-trigger-topbar-update-text');
    if (isManual && topbarText) {
        topbarText.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 检查中...';
    }

    try {
        const res = await fetch(REMOTE_MANIFEST_URL + '?t=' + Date.now(), { cache: 'no-store' });
        if (!res.ok) throw new Error('无法从 GitHub 获取版本清单');
        const remote = await res.json();
        const remoteVersion = remote.version;

        if (!remoteVersion || compareVersions(remoteVersion, LOCAL_VERSION) <= 0) {
            if (bar) bar.style.display = 'none';
            if (isManual) {
                toastr.success(`当前已是最新版本 (v${LOCAL_VERSION})`, DISPLAY_NAME);
            }
            return;
        }

        let changelog = '';
        if (remote.changelogs && typeof remote.changelogs === 'object') {
            const newerVersions = Object.keys(remote.changelogs)
                .filter((v) => compareVersions(v, LOCAL_VERSION) > 0 && compareVersions(v, remoteVersion) <= 0)
                .sort((a, b) => compareVersions(b, a));

            if (newerVersions.length > 1) {
                changelog = newerVersions.map((ver) => {
                    const text = String(remote.changelogs[ver] || '').trim();
                    return `### 🔖 版本 v${ver}\n${text}`;
                }).join('\n\n');
            } else if (newerVersions.length === 1) {
                changelog = String(remote.changelogs[newerVersions[0]] || '').trim();
            }
        }

        if (!changelog) {
            changelog = remote.changelog || remote.description || '';
        }
        _cachedRemoteUpdateInfo = { version: remoteVersion, changelog };

        // Add "New!" tag to title in drawer
        const titleEl = document.getElementById('st-scene-trigger-title');
        if (titleEl && !titleEl.querySelector('.st-scene-trigger-new-tag')) {
            titleEl.innerHTML += ` <span class="st-scene-trigger-new-tag" style="color: #ff4a4a; font-size: 11px; font-weight: bold; margin-left: 6px;">New!</span>`;
        }

        // 顶栏更新状态提示
        if (topbarText) {
            topbarText.innerHTML = `<span style="color:#ff7aa8;">发现新版 v${remoteVersion}</span>`;
        }

        // 发现新版本，渲染设置面板通知条（静默展示，不自动弹窗）
        if (bar) {
            bar.style.display = 'flex';
            bar.style.cssText = `
                display: flex; align-items: center; justify-content: space-between;
                padding: 6px 12px; margin-bottom: 8px; border-radius: 6px;
                background: rgba(255, 165, 0, 0.12); border: 1px solid rgba(255, 165, 0, 0.35);
                font-size: 13px; color: #ffcc80; gap: 8px;
            `;
            bar.innerHTML = `
                <span style="flex:1;">
                    <i class="fa-solid fa-arrow-up-right-dots" style="margin-right:4px;"></i>
                    发现新版本: <strong>${remoteVersion}</strong>
                    <span style="opacity:0.6; font-size:11px; margin-left:4px;">(当前 ${LOCAL_VERSION})</span>
                </span>
                <button id="st-scene-trigger-do-update" class="menu_button" style="
                    padding: 2px 12px; font-size: 12px; border-radius: 4px;
                    background: rgba(255, 165, 0, 0.2); color: #ffcc80;
                    border: 1px solid rgba(255, 165, 0, 0.4); cursor: pointer;
                ">更新</button>
                <button id="st-scene-trigger-dismiss-update" style="
                    background: none; border: none; color: var(--linear-text-muted);
                    cursor: pointer; font-size: 14px; padding: 2px 4px;
                ">✕</button>
            `;

            document.getElementById('st-scene-trigger-dismiss-update')?.addEventListener('click', () => {
                bar.style.display = 'none';
            });

            // 点击更新时才弹更新日志面板！
            document.getElementById('st-scene-trigger-do-update')?.addEventListener('click', () => {
                showUpdateModal(remoteVersion, changelog, executeExtensionUpdate);
            });
        }

        // 仅当用户主动点击“检查更新”时，若有新版本才弹窗
        if (isManual) {
            showUpdateModal(remoteVersion, changelog, executeExtensionUpdate);
        }

        console.info(`[${EXTENSION_NAME}] 发现新版本: ${remoteVersion} (当前: ${LOCAL_VERSION})`);
    } catch (error) {
        console.warn(`[${EXTENSION_NAME}] 版本检查失败:`, error);
        if (isManual) {
            toastr.error(`检查更新失败: ${error.message || String(error)}`, DISPLAY_NAME);
        }
    } finally {
        if (isManual && topbarText && (!topbarText.innerHTML.includes('发现新版'))) {
            topbarText.innerHTML = '检查更新';
        }
    }
}

async function mountSettingsDrawer() {
    if (document.getElementById(SETTINGS_HTML_ID)) return;
    const cacheBuster = `?v=${LOCAL_VERSION}`;
    const html = await (await fetch(new URL('settings.html' + cacheBuster, import.meta.url))).text();
    document.getElementById('extensions_settings')?.insertAdjacentHTML('beforeend', html);

    // Set version text inside the drawer
    const versionEl = document.getElementById('st-scene-trigger-version-text');
    if (versionEl) {
        versionEl.innerText = `Ver ${LOCAL_VERSION}`;
        versionEl.style.cursor = 'pointer';
        versionEl.title = '点击检查新版本';
        versionEl.addEventListener('click', () => {
            void checkForUpdate(true);
        });
    }

    const drawerBtn = document.getElementById('st-scene-trigger-open-from-drawer');
    drawerBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        setModalOpen(true);
        switchTab('general');
    });

    // 挂载后异步检查更新（不阻塞初始化）
    checkForUpdate().catch(() => { });
}

/**
 * MutationObserver 侧滑守卫：监听聊天容器 DOM，捕捉 SillyTavern 事件未触发的侧滑切换
 * 核心逻辑：某条消息的 mes_text 内容发生变化（子节点增删）时，若按鈕丢失，则重新渲染
 */
function initChatObserver() {
    _rbqChatObserver?.disconnect();
    const chatEl = document.getElementById('chat');
    if (!chatEl) {
        setTimeout(initChatObserver, 1000); // chat 容器可能尚未刚建待重试
        return;
    }

    _rbqChatObserver = new MutationObserver((mutations) => {
        for (const m of mutations) {
            if (m.type !== 'childList') continue;
            const target = m.target;
            if (!(target instanceof Element)) continue;
            // 跳过我们自己的卡片内部变化
            if (target.closest('.st-scene-trigger-inline-wrap')) continue;

            // 收集所有受影响的 mesEl
            const mesElements = [];
            const targetMes = target.matches('.mes[mesid]') ? target : target.closest('.mes[mesid]');
            if (targetMes) {
                mesElements.push(targetMes);
            } else {
                // 当 target 是容器（如 #chat）时，寻找新增节点里的 .mes
                m.addedNodes.forEach(n => {
                    if (n instanceof Element) {
                        if (n.matches('.mes[mesid]')) mesElements.push(n);
                        else {
                            const children = n.querySelectorAll('.mes[mesid]');
                            if (children.length) mesElements.push(...children);
                        }
                    }
                });
            }

            if (!mesElements.length) continue;

            mesElements.forEach(mesEl => {
                const mesId = Number(mesEl.getAttribute('mesid'));
                if (Number.isFinite(mesId)) _rbqObserverPending.add(mesId);
            });
        }

        if (!_rbqObserverPending.size) return;
        clearTimeout(_rbqObserverTimer);
        // 流式时使用超短延迟确保生图按钮跟手，正常情况下退回 150ms
        const streaming = isStreamingActive();
        const observerDelay = streaming ? 30 : 150;
        _rbqObserverTimer = setTimeout(() => {
            const ids = [..._rbqObserverPending];
            _rbqObserverPending.clear();
            const chatLen = getContext()?.chat?.length ?? 0;
            for (const id of ids) {
                // 不再跳过最后一条消息，让 processMessage 去拦截不该渲染的情况
                const mesEl = document.querySelector(`.mes[mesid="${id}"]`);
                if (!mesEl) continue;
                const anchor = getMessageTextContainer(mesEl);
                if (!(anchor instanceof HTMLElement)) continue;
                const msg = getContext()?.chat?.[id];
                if (!shouldHandleMessage(msg)) continue;
                const sig = String(msg.mes || '');
                const hasButtons = !!anchor.querySelector('.st-scene-trigger-inline-wrap');
                const sigMatch = anchor.dataset.stSceneSignature === sig;
                // 签名不匹配（内容已变）或按鈕丢失（被三方覆写），均需重渲染
                if (!sigMatch || !hasButtons) {
                    delete anchor.dataset.stSceneSignature;
                    queueProcessMessage(id);
                }
            }
        }, observerDelay);
    });

    _rbqChatObserver.observe(chatEl, { childList: true, subtree: true });
}

function initEvents() {
    eventSource.on(event_types.USER_MESSAGE_RENDERED, (id) => queueProcessMessage(Number(id)));
    eventSource.on(event_types.CHARACTER_MESSAGE_RENDERED, (id) => queueProcessMessage(Number(id)));
    eventSource.on(event_types.MESSAGE_UPDATED, (id) => queueProcessMessage(Number(id), true));
    eventSource.on(event_types.CHAT_CHANGED, () => queueExistingMessages());
    eventSource.on(event_types.MESSAGE_DELETED, () => queueExistingMessages());
    queueExistingMessages();
    initChatObserver(); // 寻丝寿守：监听侧滑/Prompt Template 等不发事件的 DOM 变更

    document.body.addEventListener('click', async (event) => {
        const drawerOpenBtn = event.target.closest('#st-scene-trigger-open-from-drawer');
        if (drawerOpenBtn) {
            event.preventDefault();
            setModalOpen(true);
            switchTab('general');
            return;
        }

        const favBtn = event.target.closest('[data-action="toggle-fav"]');
        if (favBtn) {
            event.preventDefault();
            event.stopPropagation();
            toggleHistoryFavorite(favBtn.dataset.cacheId);
            return;
        }

        const delBtn = event.target.closest('[data-action="delete-item"]');
        if (delBtn) {
            event.preventDefault();
            event.stopPropagation();
            if (confirm('确定删除此生图记录并清除本地缓存吗？')) {
                void deleteHistoryItem(delBtn.dataset.cacheId, false);
            }
            return;
        }

        const generateButton = event.target.closest('.st-scene-trigger-generate');
        const imageLink = event.target.closest('.st-scene-trigger-inline-image-link');
        const historyOpenButton = event.target.closest('[data-role="history-open-viewer"]');
        const testImg = event.target.closest('.st-scene-trigger-test-img');

        if (testImg) {
            event.preventDefault();
            void openImageViewer(
                testImg.dataset.prompt || '',
                testImg.dataset.url || '',
                { cacheId: testImg.dataset.cacheId || '' }
            );
            return;
        }

        if (imageLink) {
            event.preventDefault();
            const rawMsgId = imageLink.dataset.messageId;
            const messageId = (rawMsgId !== '' && rawMsgId != null && !Number.isNaN(Number(rawMsgId))) ? Number(rawMsgId) : null;
            void openImageViewer(
                imageLink.dataset.prompt || '',
                imageLink.dataset.url || imageLink.getAttribute('href') || '',
                { messageId, cacheId: imageLink.dataset.cacheId || '' },
            );
            return;
        }

        if (historyOpenButton) {
            event.preventDefault();
            const rawMsgId = historyOpenButton.dataset.messageId;
            const messageId = (rawMsgId !== '' && rawMsgId != null && !Number.isNaN(Number(rawMsgId))) ? Number(rawMsgId) : null;
            void openImageViewer(
                historyOpenButton.dataset.prompt || '',
                historyOpenButton.dataset.url || '',
                {
                    messageId,
                    cacheId: historyOpenButton.dataset.cacheId || '',
                    fromHistory: true,
                },
            );
            return;
        }

        if (generateButton) {
            const wrapper = generateButton.closest('.st-scene-trigger-inline-wrap');
            try {
                const prompt = wrapper?.dataset?.prompt || '';
                if (!prompt) return;

                const isNaiMode = getSettings().currentMode === 'nai';
                const inlineLoader = wrapper.querySelector('.st-scene-trigger-inline-loader');
                const inlineSubText = wrapper.querySelector('.st-scene-trigger-nai-loader-sub');

                generateButton.disabled = true;

                if (isNaiMode && inlineLoader != null) {
                    generateButton.style.display = 'none';
                    // Force-restart spinner animation
                    const spinner = inlineLoader.querySelector('.st-scene-trigger-nai-spinner');
                    if (spinner) { spinner.style.animation = 'none'; void spinner.offsetHeight; spinner.style.animation = ''; }
                    inlineLoader.style.display = 'flex';
                } else {
                    generateButton.classList.add('loading');
                    generateButton.textContent = '生成中...';
                }

                const result = await generateImage(
                    prompt,
                    'button',
                    { messageId: Number(wrapper?.dataset?.messageId) },
                    (statusText) => {
                        if (inlineSubText != null) inlineSubText.textContent = statusText;
                    }
                );

                renderInlineGeneratedImage(wrapper, result);
            } catch (error) {
                toastr.error(translateError(error), EXTENSION_NAME);
                const isNaiMode = getSettings().currentMode === 'nai';
                const inlineLoader = wrapper?.querySelector('.st-scene-trigger-inline-loader');
                if (isNaiMode && inlineLoader != null) {
                    inlineLoader.style.display = 'none';
                    generateButton.style.display = '';
                    generateButton.textContent = '生成图片';
                }
            } finally {
                generateButton.disabled = false;
                generateButton.classList.remove('loading');
                generateButton.textContent = '生成图片';
                generateButton.style.display = 'inline-block';
                const inlineLoader = wrapper?.querySelector('.st-scene-trigger-inline-loader');
                if (inlineLoader != null) inlineLoader.style.display = 'none';
            }
        }
    });
}

function loadPlugins() {
    const plugins = getSettings()._plugins || {};
    let loadedCount = 0;
    for (const [id, plugin] of Object.entries(plugins)) {
        if (!plugin || !plugin.enabled || !plugin.code) continue;
        try {
            const runner = new Function('RBQ', 'jQuery', 'toastr', plugin.code);
            runner(window.RBQ, $, toastr);
            console.info(`[RBQ Plugin] Loaded successfully: ${id} (v${plugin.version})`);
            loadedCount++;
        } catch (e) {
            console.error(`[RBQ Plugin] Core exception while loading ${id}:`, e);
            toastr.error(`RBQ 插件加载失败: ${id}`);
        }
    }
    if (loadedCount > 0) setStatus(`已加载 ${loadedCount} 个第三方网络插件`);
}

jQuery(async () => {
    try {
        ensureComfyWorkflowState();
        ensureGlobalProfiles();
        hydrateNaiAdvancedStateFromSettings();
        loadPlugins();
        debugSwitchState('init:after-hydrate');
        await mountSettingsDrawer();
        mountModal();
        initPluginManager(); // Init marketplace after modal is rendered
        mountImageViewer();
        mountFloatingUi();
        mountOptionsEntry();
        initEvents();
        syncUi();
        debugSwitchState('init:after-sync');
        refreshComfyUiCapabilities().catch(() => { });
        setStatus(getSettings().enabled ? '\u5df2\u542f\u7528' : '\u5df2\u505c\u7528');

        // 后台异步执行缓存清理与历史记录加载，绝对不阻塞酒馆启动加载屏
        void (async () => {
            try {
                // 1. 最高优先级：并发秒级刷新聊天区可见卡片（最新楼层优先呈现）
                await refreshVisibleInlineImages();
            } catch (cardErr) {
                console.warn(`[${EXTENSION_NAME}] initial card refresh warning:`, cardErr);
            }
            try {
                // 2. 聊天卡片就绪后，慢速在后台清理过期缓存与渲染设置面板图库
                pruneExpiredHistoryEntries();
                await pruneExpiredCache();
                await renderHistory();
            } catch (bgErr) {
                console.warn(`[${EXTENSION_NAME}] background post-init warning:`, bgErr);
            }
        })();
    } catch (error) {
        console.error(`[${EXTENSION_NAME}] failed`, error);
        setStatus('\u521d\u59cb\u5316\u5931\u8d25');
        if (typeof toastr !== 'undefined' && toastr.error) {
            toastr.error(`[RBQ] 主扩展初始化失败: ${error?.message || error}`);
        }
    }
});
