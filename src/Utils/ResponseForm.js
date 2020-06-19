


export class ResForm {

    constructor({ status = '', code = "0", data = [] }) {
        this.status = status;
        this.code = code;
        this.data = data;
    }
}
export class ResPage {
    constructor({ status = "", code = "0", data = [], page = 1, page_size = 15, total = 0 }) {
        this.status = status
        this.code = code
        this.start({ status, code, data, page, page_size, total })

    }
    start({ status, code, data, page, page_size, total }) {
        return this.data = {
            data: data,
            first_page_url: "https://testyzxfb.shyunhua.com?page=" + page,
            from: (page - 1) * page_size,
            last_page: 1,
            last_page_url: "https://testyzxfb.shyunhua.com?page=1",
            next_page_url: null,
            path: "https://testyzxfb.shyunhua.com",
            per_page: page_size,
            prev_page_url: null,
            to: page * page_size > total ? total : page * page_size,
            total: total,
            current_page: Number(page)
        }
    }


}

