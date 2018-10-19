/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const makeSerializable = require("./util/makeSerializable");
const WebpackError = require("./WebpackError");

class ModuleNotFoundError extends WebpackError {
	constructor(module, err, loc) {
		super("Module not found: " + err);

		this.name = "ModuleNotFoundError";
		this.details = err.details;
		this.missing = err.missing;
		this.module = module;
		this.error = err;
		this.loc = loc;

		Error.captureStackTrace(this, this.constructor);
	}

	serialize(context) {
		const { write } = context;

		write(this.name);
		write(this.details);
		write(this.missing);
		write(this.module);
		write(this.error);
		write(this.loc);

		super.serialize(context);
	}

	deserialize(context) {
		const { read } = context;

		this.name = read();
		this.details = read();
		this.missing = read();
		this.module = read();
		this.error = read();
		this.loc = read();

		super.deserialize(context);
	}
}

module.exports = ModuleNotFoundError;
