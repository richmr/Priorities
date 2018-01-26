function initializeData () {
	var portfolio = "dummy";
	people = getPeople(portfolio);
	priorityChips = getPriorityTableProjects(portfolio);
	archivedProjects = getArchivedProjects(portfolio);
	projects = getProjectBasics(portfolio);
}