window.onload=function(){

var canvas = document.getElementById('permute_visual')
var ctx = canvas.getContext('2d')
var range = document.getElementById('speed')
var interval

function change_interval(){
	if(typeof interval !== "undefined")
		clearInterval(interval)
	interval = setInterval(function display_next(){
		if(recorded.length > 0){
			display2(recorded.shift())
		}
	}, range.value)
}

// List of all possible edges for each node
var adjacent_list = [
	[1, 3, 4, 5, 7],
	[0,2,3,4,5,6,8],
	[1,3,4,5,7],
	[0,1,2,4,6,7,8],
	[0,1,2,3,5,6,7,8],
	[0,1,2,4,6,7,8],
	[1,3,4,5,7],
	[0,2,3,4,5,6,8],
	[1,3,4,5,7]
]
var recorded = []


// print_location.innerHTML += text

/* <--800-->
 * ^
 * |  * * *   *<--200-->*?
 *600 * * *
 * |  * * *
 * v
 */


function display(perm){
	ctx.fillStyle = "black"
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	var width_offset = 150
	var height_offset = 100
	var inner_width = canvas.width - (2 * width_offset)
	var inner_height = canvas.height - (2 * height_offset)
	ctx.fillStyle = "white"
	for(var i = 0; i < 3; i++){
		for (var j = 0; j < 3; j++) {
			ctx.beginPath()
			ctx.arc(inner_width / 2 * i + width_offset, inner_height / 2 * j + height_offset, 25, 0, 2 * Math.PI)
			ctx.closePath()
			ctx.fill()
		}
	}
	ctx.fillStyle = "red"
	ctx.strokeStyle = "red"
	ctx.lineWidth = 8
	ctx.lineCap = 'round'
	ctx.lineJoin = 'round'
	for(var i = 0; i < perm.length - 1; i++){
		var x1 = (inner_width / 2) * (perm[i] % 3) + width_offset
		var x2 = (inner_width / 2) * (perm[i + 1] % 3) + width_offset
		var y1 = (inner_height / 2) * Math.floor(perm[i] / 3) + height_offset
		var y2 = (inner_height / 2) * Math.floor(perm[i + 1] / 3) + height_offset
		var mid_x = x1 + (x2 - x1) / 2
		var mid_y = y1 + (y2 - y1) / 2
		// Draw the line
		ctx.beginPath()
		ctx.moveTo(x1, y1)
		ctx.lineTo(x2, y2)
		ctx.closePath()
		ctx.stroke()
		// Draw the triangle to indicate line direction
		ctx.translate(mid_x, mid_y)
		ctx.rotate(direction - Math.PI/2)
		ctx.translate(-mid_x, -mid_y)
		ctx.beginPath()
		ctx.moveTo(mid_x, mid_y)
		ctx.lineTo(mid_x - 12, mid_y - 19)
		ctx.lineTo(mid_x + 12, mid_y - 19)
		ctx.closePath()
		ctx.fill()
		ctx.translate(mid_x, mid_y)
		ctx.rotate(-(direction - Math.PI/2))
		ctx.translate(-mid_x, -mid_y)
	}
}

function display2(perm){
	ctx.fillStyle = "black"
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	var width_offset = 150
	var height_offset = 100
	var inner_width = canvas.width - (2 * width_offset)
	var inner_height = canvas.height - (2 * height_offset)
	ctx.fillStyle = "white"
	for(var i = 0; i < 3; i++){
		for (var j = 0; j < 3; j++) {
			ctx.beginPath()
			ctx.arc(inner_width / 2 * i + width_offset, inner_height / 2 * j + height_offset, 11, 0, 2 * Math.PI)
			ctx.closePath()
			ctx.fill()
		}
	}
	for(var i = 0; i < perm.length; i++){
		var x1 = (inner_width / 2) * (perm[i] % 3) + width_offset
		var x2 = (inner_width / 2) * (perm[i + 1] % 3) + width_offset
		var y1 = (inner_height / 2) * Math.floor(perm[i] / 3) + height_offset
		var y2 = (inner_height / 2) * Math.floor(perm[i + 1] / 3) + height_offset
		var mid_x = x1 + (x2 - x1) / 2
		var mid_y = y1 + (y2 - y1) / 2
		// Draw a red circle
		ctx.strokeStyle = "red"
		ctx.lineWidth = 4
		ctx.beginPath()
		ctx.arc(x1, y1, 27, 0, 2 * Math.PI)
		ctx.closePath()
		ctx.stroke()
		if(i < perm.length - 1){
			// Calculate arc tangent of the vector between the two points
			var direction = Math.atan2(y2 - y1, x2 - x1)
			// Circle outside radius line stack
			var rx1 = x1 + Math.cos(direction) * 28
			var ry1 = y1 + Math.sin(direction) * 28
			var rx2 = x2 - Math.cos(direction) * 28
			var ry2 = y2 - Math.sin(direction) * 28
			// Draw the line
			ctx.lineCap = 'round'
			ctx.lineJoin = 'round'
			ctx.strokeStyle = "red"
			ctx.lineWidth = 6
			ctx.beginPath()
			ctx.moveTo(rx1, ry1)
			ctx.lineTo(rx2, ry2)
			ctx.closePath()
			ctx.stroke()
			// Draw the red triangle to indicate line direction
			// ctx.fillStyle = "red"
			// ctx.translate(mid_x, mid_y)
			// ctx.rotate(direction - Math.PI/2)
			// ctx.translate(-mid_x, -mid_y)
			// ctx.beginPath()
			// ctx.moveTo(mid_x, mid_y + 9)
			// ctx.lineTo(mid_x - 12, mid_y - 10)
			// ctx.lineTo(mid_x + 12, mid_y - 10)
			// ctx.closePath()
			// ctx.fill()
			// ctx.translate(mid_x, mid_y)
			// ctx.rotate(-(direction - Math.PI/2))
			// ctx.translate(-mid_x, -mid_y)
			// Draw a white triangle inside the red circle indicating direction
			ctx.strokeStyle = "white"
			ctx.lineWidth = 2
			ctx.translate(rx1, ry1)
			ctx.rotate(direction - Math.PI/2)
			ctx.translate(-rx1, -ry1)
			ctx.beginPath()
			ctx.moveTo(rx1, ry1 - 7)
			ctx.lineTo(rx1 + 6, ry1 - 12)
			ctx.moveTo(rx1, ry1 - 7)
			ctx.lineTo(rx1 - 6, ry1 - 12)
			ctx.stroke()
			ctx.translate(rx1, ry1)
			ctx.rotate(-(direction - Math.PI/2))
			ctx.translate(-rx1, -ry1)
		}
	}
}

function record(perm){
	recorded.push(perm.slice(0))
}


function permutations(depth, maxdepth, stack, visited){
	if(depth >= maxdepth){
		record(stack)
		return
	}

	var current_node = stack[depth - 1]
	visited.push(current_node)
	var next_possible_nodes = adjacent_list[current_node]

	for(var i = 0; i < next_possible_nodes.length; i++){
		if(visited.indexOf(next_possible_nodes[i]) != -1)
			continue

		stack.push(next_possible_nodes[i])
		permutations(depth+1, maxdepth, stack, visited)
		stack.pop()
	}

	visited.pop()

	return
}

function main(){
	// var text = ""
	// var print_location = document.getElementById("results")
	for(var num_nodes = 4; num_nodes <= 9; num_nodes++){
		// print_location.innerHTML += "<a href=\"#"+(num_nodes)+"\">"+(num_nodes)+"</a>&nbsp;&nbsp;"
		// text += "<a name=\""+(num_nodes)+"\"></a><h2>"+(num_nodes)+"</h2>"
		for(var i = 0; i < 9; i++){
			permutations(1, num_nodes, [i], [i])
		}
	}
	
	display2(recorded.shift())
	range.onchange = change_interval
	change_interval()
}

main()

}
