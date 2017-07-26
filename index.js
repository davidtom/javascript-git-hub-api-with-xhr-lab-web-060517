const reposURLBegin = 'https://api.github.com/users/'
const reposURLEnd = '/repos'
const commitsURLBegin = 'https://api.github.com/repos/'
const commitsURLEnd = '/commits'
const branchesURLBegin = 'https://api.github.com/repos/'
const branchesURLEnd = '/branches'

document.getElementById("username-submit").addEventListener("click", function(event){
  event.preventDefault()
  let username = event.currentTarget.form[0].value
  getRepositories(username)
})


function getRepositories(username){
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", reposURLBegin + username + reposURLEnd)
  req.send()
}

function displayRepositories(event, data) {
  let repos = JSON.parse(this.responseText)
  console.log(repos)
  // const repoList = `<ul>${repos.map(repo =>'<li>'+repo.name+'</li>').join("")}</ul>`
  const repoList = `<ul>${repos.map(repo =>'<li><a href='+repo.html_url+'>'+repo.name+'</a> - <a href="#" data-repo="'+repo.full_name+'" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repo="'+repo.full_name+'" onclick="getBranches(this)">Get Branches</a></li>').join("")}</ul>`
  console.log(repoList)
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(element){
  const name = element.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", commitsURLBegin + name + commitsURLEnd)
  req.send()
}

function displayCommits(){
  const commits = JSON.parse(this.responseText)
  console.log(commits)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(element){
  const name = element.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", branchesURLBegin + name + branchesURLEnd)
  req.send()
}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  console.log(branches)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
