/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const makeSerializable = require("./util/makeSerializable");
const WebpackError = require("./WebpackError");

/** @typedef {import("./Module")} Module */

class ModuleDependencyError extends WebpackError {
	/**
	 * Creates an instance of ModuleDependencyError.
	 * @param {Module} module module tied to dependency
	 * @param {Error} err error thrown
	 * @param {TODO} loc location of dependency
	 */
	constructor(module, err, loc) {
		super(err.message);

		this.name = "ModuleDependencyError";
		this.details = err.stack
			.split("\n")
			.slice(1)
			.join("\n");
		this.module = module;
		this.loc = loc;
		this.error = err;

		Error.captureStackTrace(this, this.constructor);
	}

	serialize(context) {
		const { write } = context;

		write(this.name);
		write(this.details);
		write(this.module);
		write(this.loc);
		write(this.error);

		super.serialize(context);
	}

	deserialize(context) {
		const { read } = context;

		this.name = read();
		this.details = read();
		this.module = read();
		this.loc = read();
		this.error = read();

		super.deserialize(context);
	}
}

makeSerializable(ModuleDependencyError, "webpack/lib/ModuleDependencyError");

module.exports = ModuleDependencyError;
