import { escape } from "../../../DB/DB"
export let post = ({ name }) => {
    return `SELECT * FROM Admin WHERE account = ${escape(name)}`
}
