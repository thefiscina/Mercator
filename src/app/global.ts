// global.ts
import { Injectable } from "@angular/core";
import { AppConfig } from "./service/app.config";
import * as moment from "moment";


@Injectable()
export class Global {
    constructor() { }

    apiUrl = AppConfig.settings.apiServer.apiUrl;
    currentUser: any = {}
    token_acesso: any;
    codigo_pdv: any = "";


    dateFormat(dataStr: any) {
        if (dataStr == null || dataStr == "") {
            return "--/--/--";
        }
        return moment(dataStr).format("DD/MM/YYYY");
    }

    numberOnly(event: any): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    mascara(t: any, mask: any) {
        var i = t.currentTarget.value;
        var saida = mask.substring(1, 0);
        var texto = mask.substring(i)
        if (texto.substring(0, 1) != saida) {
            t.currentTarget.value += texto.substring(0, 1);
        }
    }

    formatDateDay(value: any) {
        if (value) {
            return moment(value).format("DD");
        }
        return "--";
    }

    formatDateDayMonth(value: any) {
        if (value) {
            return moment(value).format("DD/MM");
        }
        return "--";
    }

    formateDateMonth(value: any) {
        var meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro "];
        if (value) {
            var monthIndex = moment(value).month();
            return meses[monthIndex];
        }
        return "--";
    }

    formateDate(value: any) {
        if (value) {
            return moment(value).format("DD/MM/YYYY");
        }
        return "--";
    }

    formateDateAndTime(value: any) {
        if (value) {
            return moment(value).format("DD/MM/YYYY HH:mm:ss");
        }
        return "--";
    }

    formateDateDayWeek(value: any) {
        var week = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]
        if (value) {
            var weekIndex = moment(value).day();
            return week[weekIndex].substring(0, 3);
        }
        return "--";
    }

    formateTime(value: any) {
        if (value) {
            return moment(value).format("HH:mm");
        }
        return "--";
    }

    formaterCurrency(value: any) {
        if (value) {
            if (value.toString().includes("R$")) {
                return value.replace("R$", "").trim();
            }
            return value;
        }
        return value
    }


    MD5(d: any) {
        var result = this.M(this.V(this.Y(this.X(d), 8 * d.length)));
        return result.toLowerCase()
    };

    M(d: any) {
        for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _);
        return f;
    }

    X(d: any) {
        for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0;
        for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32;
        return _;
    }

    V(d: any) {
        for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255);
        return _;
    }

    Y(d: any, _: any) {
        d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _;
        for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
            var h = m, t = f, g = r, e = i;
            f = this.md5_ii(f = this.md5_ii(f = this.md5_ii(f = this.md5_ii(f = this.md5_hh(f = this.md5_hh(f = this.md5_hh(f = this.md5_hh(f = this.md5_gg(f = this.md5_gg(f = this.md5_gg(f = this.md5_gg(f = this.md5_ff(f = this.md5_ff(f = this.md5_ff(f = this.md5_ff(f, r = this.md5_ff(r, i = this.md5_ff(i, m = this.md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = this.md5_ff(r, i = this.md5_ff(i, m = this.md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = this.md5_ff(r, i = this.md5_ff(i, m = this.md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = this.md5_ff(r, i = this.md5_ff(i, m = this.md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = this.md5_gg(r, i = this.md5_gg(i, m = this.md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = this.md5_gg(r, i = this.md5_gg(i, m = this.md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = this.md5_gg(r, i = this.md5_gg(i, m = this.md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = this.md5_gg(r, i = this.md5_gg(i, m = this.md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = this.md5_hh(r, i = this.md5_hh(i, m = this.md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = this.md5_hh(r, i = this.md5_hh(i, m = this.md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = this.md5_hh(r, i = this.md5_hh(i, m = this.md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = this.md5_hh(r, i = this.md5_hh(i, m = this.md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = this.md5_ii(r, i = this.md5_ii(i, m = this.md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = this.md5_ii(r, i = this.md5_ii(i, m = this.md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = this.md5_ii(r, i = this.md5_ii(i, m = this.md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = this.md5_ii(r, i = this.md5_ii(i, m = this.md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = this.safe_add(m, h), f = this.safe_add(f, t), r = this.safe_add(r, g), i = this.safe_add(i, e)
        }
        return Array(m, f, r, i)
    };

    md5_cmn(d: any, _: any, m: any, f: any, r: any, i: any) {
        return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(_, d), this.safe_add(f, i)), r), m)
    };

    md5_ff(d: any, _: any, m: any, f: any, r: any, i: any, n: any) {
        return this.md5_cmn(_ & m | ~_ & f, d, _, r, i, n)
    };

    md5_gg(d: any, _: any, m: any, f: any, r: any, i: any, n: any) {
        return this.md5_cmn(_ & f | m & ~f, d, _, r, i, n)
    };

    md5_hh(d: any, _: any, m: any, f: any, r: any, i: any, n: any) {
        return this.md5_cmn(_ ^ m ^ f, d, _, r, i, n)
    };

    md5_ii(d: any, _: any, m: any, f: any, r: any, i: any, n: any) {
        return this.md5_cmn(m ^ (_ | ~f), d, _, r, i, n)
    };

    safe_add(d: any, _: any) {
        var m = (65535 & d) + (65535 & _);
        return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m
    };

    bit_rol(d: any, _: any) {
        return d << _ | d >>> 32 - _
    };

    /* necessário para o md5 */
    md5Normal(valor: any) {
        var result = this.MD5(valor);
        return result;
    }
}
