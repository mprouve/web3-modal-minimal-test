import * as log from "loglevel";

log.getLogger("main").setLevel("DEBUG");

export const logMain: log.Logger = log.getLogger("main");

export default log;
