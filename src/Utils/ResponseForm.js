


export class ResForm {

    constructor({ status = '', code = "0", data = [] }) {
        this.status = status;
        this.code = code;
        this.data = data;
    }
}
export class ResPage {
    constructor({ status = "", code = "0", data = [], page = 1, page_size = 15, total = 0 }) {
        this.status = status;
        this.code = code;
        this.data = data;
        this.first_page_url = "https://testyzxfb.shyunhua.com?page=" + page;
        this.from = (page - 1) * page_size;
        this.last_page = 1;
        this.last_page_url = "https://testyzxfb.shyunhua.com?page=1";
        this.next_page_url = null;
        this.path = "https://testyzxfb.shyunhua.com";
        this.per_page = page_size;
        this.prev_page_url = null;
        this.to = page * page_size > total ? total : page * page_size;
        this.total = total;
        this.current_page = page

    }


}

