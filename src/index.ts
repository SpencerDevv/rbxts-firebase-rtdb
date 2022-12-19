import { HttpService } from "@rbxts/services";

export class Firebase {
	private _name: string;
	private _scope: string;
	private _path: string;
	private _auth: string;

	constructor(name: string, scope: string, path: string, auth: string) {
		this._name = name;
		this._scope = scope;
		this._path = path;
		this._auth = auth;
	}

	GetAsync(key: string): unknown {
		assert(
			type(key) === "string",
			"Roblox-Firebase GetAsync: Bad Argument #1, string expected got '" + tostring(type(key)) + "'",
		);

		key = key.sub(1, 1) !== "/" ? "/" + key : key;
		const dir = this._path + HttpService.UrlEncode(key) + this._auth;

		const request = {
			Url: dir,
			Method: "GET",
		};

		let response: unknown;
		const [success, error] = pcall(() => {
			response = HttpService.RequestAsync(request as RequestAsyncRequest);
		});
		if (!success) {
			warn("Roblox-Firebase GetAsync Failed to fetch data");
			return;
		}

		if (response === undefined) return;

		return HttpService.JSONDecode(response?.body);
	}
}

export class RobloxFirebase {
	private _URL: string;
	private _Auth: string;
	private _scope = "";

	constructor(url: string, auth: string, scope?: string) {
		this._URL = url;
		this._Auth = auth;

		if (scope !== undefined) {
			this._scope = scope;
		}
	}

	GetFirebase(name: string, scope: string): Firebase {
		assert(this._Auth !== undefined, "AuthenticationToken expected, got nil");
		assert(scope !== undefined || this._scope !== undefined, "DefaultScope or Scope expected, got nil");

		// eslint-disable-next-line roblox-ts/lua-truthiness
		scope = scope || this._scope;
		const path = scope + HttpService.UrlEncode(name);
		const auth = ".json?auth=" + this._Auth;
		return new Firebase(name, scope, path, auth);
	}
}
