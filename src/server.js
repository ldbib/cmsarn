/*

CMSarn 0.0.1

Copyright 2014 Emil Hemdal <emil(at)hemdal(dot)se>
Copyright 2014 Landstinget Dalarna Bibliotek och informationscentral <webmaster(dot)lasarettsbiblioteken(at)ltdalarna(dot)se>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

/* jshint curly: true, eqeqeq: true, immed: true, indent: 4, latedef: true, noarg: true, nonbsp: true, nonew: true, undef: true, eqnull: true, node: true */

"use strict";

var express 		= require("express"),
	cookieParser 	= require("cookie-parser"),
	fs 				= require("fs");

var ADMIN 			= require("./modules/admin.js");

process.chdir("./build");

var app 			= express();

app.enable("trust proxy") // DISABLE if you don't use NGINX or Apache in front of node.js!!
	.use(cookieParser());

var router 			= express.Router();


router.use(function(req, res, next) {
	next();
});

router.all("/admin", function(req, res, next) {
	ADMIN.run(req, res, next);
});

router.get("/", function(req, res/*, next*/) {
	fs.stat("./public/html/index.html", function(err/*, stats*/) {
		if(err) { console.log(err); }
		res.set({
			"Content-Type": "text/html; charset=utf-8",
			"vary": "Accept-Encoding"
			//"Content-Length": stats.size,
			//"ETag": crypto.createHash("md5").update(stats.size+stats.mtime).digest("hex")
		});

		var indexPath = "./public/html/index.html";

		if(req.get("Accept-Encoding")) {
			var accept = req.get("Accept-Encoding");
			if(accept.indexOf("gzip") !== -1) {
				res.set("content-encoding", "gzip");
				indexPath = "./public/html/index.html.gz";
			}
		}

		fs.createReadStream(indexPath).pipe(res);
	});
});

router.get("/fetch/:id", function(req, res/*, next*/) {
	console.log("GET /");
	var object = {
		type: "page",
		settings: {
			sidebar: ""
		},
		title: "Title "+req.params.id,
		header: "HEADER "+req.params.id,
		content: "<div class='row'><div class='col-sm-4' id='sidebar'><ul><li><a href='#/home'>HOME</a></li><li><a href='#/test'>TEST</a></li></ul></div><div class='col-sm-8' id='main'><h2>HOME</h2></div></div>",
		sidebar: "SIDEBAR",
		footer: "<div class='text-center'><p>CMSarn v0.0.1 ©2014 Landstinget Dalarna Bibliotek och informationscentral</p></div>",
		css: "#header { background-color: blue } "+
			"#sidebar { background-color: green } "+
			"#content { background-color: yellow } "+
			"#footer { background-color: red } "+
			"body { background-color: purple }"
	};
	var text = JSON.stringify(object);
	res.writeHead(200, {"Content-Length": text.length, "Content-Type": "text/plain; charset=UTF-8"});
	res.end(text);
	//next();
});

app.use(router);
app.listen(26727);
console.log("SERVER STARTED!");
