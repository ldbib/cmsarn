/*

Copyright 2014 Emil Hemdal <emil(at)hemdal(dot)se>
Copyright 2014 Landstinget Dalarna Bibliotek och informationscentral <webmaster(dot)lasarettsbiblioteken(at)ltdalarna(dot)se>

This file is part of CMSarn.

CMSarn is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

CMSarn is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with CMSarn.  If not, see <http://www.gnu.org/licenses/>.

*/

/* jshint curly: true, eqeqeq: true, immed: true, indent: 4, latedef: true, noarg: true, nonbsp: true, nonew: true, undef: true, unused: vars, strict: true, asi: true, eqnull: true, browser: true, devel: true, jquery: true */

function buildWebsite(json) {
	"use strict";

	//var HTML = "";

	$("title").text(json.title);

	$("#dynamicStyle").text(json.css);

	if(typeof json.header === "string") {
		$("#header").html(json.header);
	}

	if(typeof json.footer === "string") {
		$("#footer").html(json.footer);
	}

	if(typeof json.content === "string") {
		$("#content").html(json.content);
	} else {

	}
}

(function() {
	"use strict";
	$(window).on("hashchange", function() {
		var toFetch;
		if(window.location.hash.indexOf("#/") === 0) {
			toFetch = "/fetch/"+window.location.hash.substr(2);
		} else if(window.location.hash === "") {
			toFetch = "/fetch/index";
		} else {
			return;
		}
		$.get(toFetch, function(data, textStatus, jqXHR) {
			buildWebsite(JSON.parse(data));
			//$("#content").html(data);
		});
	}).trigger("hashchange");
}());
