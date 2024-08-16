apps.errcinsp = {
	"name": "ErrCodeInspec",
	exec() {
		let wid = win({
			title: "Error Code Inspector",
			inner: "<iframe src=\"https://HEXEc-sevrer.tbsharedaccount.repl.co/asset/ErrorCodeInspector/index.html\" width=\"100%\" height=\"100%\">",
			width: 400,
			height: 500,
			closable: true
		})
	}
}