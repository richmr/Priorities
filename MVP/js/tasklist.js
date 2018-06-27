/*
Copyright 2018 Michael R Rich (mike@tofet.net)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions 
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

$("#task_list").click(function(event) {
		clickOnTaskList();		
	});
	
function clickOnTaskList () {
	// Open in a new window
	// https://stackoverflow.com/questions/10472927/add-content-to-a-new-open-window
	//OpenWindow.init();	
	
	// Generate the data in the task list
	// Clear the task list
	var tasklisthtml = listByPerson();
	//tasklisthtml += "<hr>" + listByOwner();
	
	// Open the new window (for easy printing))	
	var OpenWindow = window.open("tasklist.html", "mywin", '');
	OpenWindow.dataFromParent = tasklisthtml; 
	
}

function aTaskEntry(taskData, format=['effortTitle', ' : ', 'task']) {
	// returns a html-formatted entry according to the format statement
	// effortTitle = name of the effort
	// task = print the task description
	// Anything else prints as a string literal
	var htmlstring = "";
	$.each(format, function (index, value) {
		if (value == "effortTitle") {
			htmlstring += taskData["effortTitle"];
		} else if (value == "task") {
			htmlstring += taskData["task"];
		} else {
			htmlstring += value;
		}
	});
	return htmlstring;	
}

function listByPerson() {
	// returns a well formatted list of tasks, grouped by "who"
}