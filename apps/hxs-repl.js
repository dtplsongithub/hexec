apps.hxsrepl = {
	"name": "HXS",
	exec() {
		let htmlduck = '<iframe src="/hxs-repl.html" width="100%" height="100%" style="overflow: hidden">'
		let wid = win({
			title: "HXS",
			inner: htmlduck,
			width: 600,
			height: 500,
			closable: true
		})
	}
}