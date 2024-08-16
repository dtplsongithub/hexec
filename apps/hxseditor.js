apps.hxseditor = {
	"name": "HXS Code Editor",
	exec() {
		let htmlduck = '<iframe src="/hxs-editor/index.html" width="100%" height="100%" style="overflow: hidden">'
		let wid = win({
			title: "HXSEditor",
			inner: htmlduck,
			width: 600,
			height: 500,
			closable: true
		})
	}
}