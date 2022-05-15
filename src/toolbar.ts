
// <div id="tool">
// 	<a href="https://web.groupme.com">
// 		<img src="https://i.imgur.com/1yuaqXU.png">
// 	</a>
// </div>

export function createTool(imgSrc:string, url:string) {
  var tool:HTMLDivElement = document.createElement('div');
  var link:HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
  var img:HTMLImageElement = document.createElement('img') as HTMLImageElement;
  tool.id = "tool";
  link.href = url;
  img.src = imgSrc;

  link.appendChild(img);
  tool.appendChild(link);
  document.getElementById("toolbar").appendChild(tool);
}

export function createToolbar() {
  for(var i = 0; i < 30; ++i) {
    createTool("public/assets/plus.png", "google.com");
  }
}
