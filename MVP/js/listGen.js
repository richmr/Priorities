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

function createAllTasksObject() {
	// Creates an object of all the "Who", with their list of tasks
	// 
	// Thoughts
	/*
		- Go through each table row, find an active project
				- For this project, go through task list
					- For each task list entry create an entry in a dictionary:
						{ [who]:[{ProjectTitle: " ", what: " ", ProjectSlot: " ", when:" "}, {repeat}], [nextWho]}
		- Issues
			- "Who" might be multiple words, so needs to be concatenated by a "_" (or other valid space designator)
			- "Who" matching should be case insensitive
			- If a "Who" isn't found, then it needs to be added to the object
			- Projects may have more than one task assigned to each Who, so a bit of redundant data here
			
		
	*/

// If we select on "priority-row-" we will get all of the items in the priority row
// Then we have to get the id of the object, and use this in the "priorityChips" object to get the projectID
// Then we get the list of tasks from projects[projectID]["tasks"] and each has a "who", "what" , "when";
//  Project Pri has to be pulled from the "-slot-x" addendum to each "priority-row-" and calculated to match the categories in priorityRowData
// Nope: Lets just use the slot ID to put them in order after the fact.  
// Project name is projects[id]["title"]
// Nope: let's pull the project name from the database dynamically
 				
	var allTasks = {};
	$('div[id^="priority-row-"]').each(function (index) {
		// Get ID of object
		var id = $(this).attr('id');
		// Get slot num
		// id is "priority-row-X-slot-Y"  So split on "-" and then grab last element
		var slotnum = id.split("-").slice(-1)[0];		
		// Get project ID
		var projID = priorityChips[id]["projectID"];
		var projTitle = projects[projID]["title"];		
		// Get task list
		var tasklist = projects[projID]["tasks"];
		// Begin iteration over the tasks
		$.each(tasklist, function (index, aTask) {
			var who = aTask["who"];
			var what = aTask["what"];
			var when = aTask["when"];
			// Need to 'normalize' the who - make it all lowercase
			// When we print it, though, we should capitalize all the words
			// https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
			// Make the task obj
			var taskobj = {"ProjectTitle":projTitle, "what":what, "when":when, "ProjectSlot":slotnum};
			who = who.toLowerCase();
			// Is there this "Who" already?
			if (allTasks[who]) {
				// Add a new task object				
				allTasks[who].push(taskobj);
			} else {
				allTasks[who]= [taskobj];
			}
		});
	
	});
	// Is that it?
	return allTasks;
}



