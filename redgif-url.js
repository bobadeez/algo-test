let wordcost
let maxword


const inferSpaces = s => {
	/* 
	Uses dynamic programming to infer the location of spaces in a string
    without spaces. 
    */

	const bestMatch = i => {
		/* 
		Find the best match for the i first characters, assuming cost has
	    been built for the i-1 first characters. Returns a pair (minCost, length). 
	    */	    
	    let candidates = cost.slice(Math.max(0, i-maxword), i)
	    let minCost = -1
	    let length
	    for (let k=0; k<candidates.length; k++) {
	    	let substring = s.slice(i-k-1, i)
	    	if (wordcost.hasOwnProperty("substring")) {
	    		let n = candidates.length - k -1
	    		let total = candidates[n] + wordcost[substring]
	    		if (total < minCost || minCost < 0) {
	    			minCost = total
	    			length = k + 1
	    		}
	    	}
	    }
	    return [minCost, length]
	}

	// build the cost array and length array
	let cost = [0]
	let len_arr = [0]
	for (let i=1; i<s.length+1; i++) {
		const [c, k] = bestMatch(i)
		cost.push(c)
		len_arr.push(k)
	}

	// backtrack to recover the minimal-cost string
	let out = []
	i = s.length
	while (i>0) {
		out.push(s.slice(i-len_arr[i], i))
		i -= len_arr[i]
	}

	return out.reverse()
}


const capitalize = text => {
  return text.charAt(0).toUpperCase() + text.slice(1);
}


const decode = text => {
	let capitalized_strings = []
	let words = inferSpaces(text)
	for (let i=0; i<words.length-2; i++) {
		for (let j=i+1; j<words.length-1; j++){
			for (let k=j+1; k<words.length; k++) {
				let solution = ""
				for (let l=0; l<words.length; l++) {
					if (l == i || l == j || l == k) {
						solution += capitalize(words[l])
					}
					else solution += words[l]
				}
				capitalized_strings.push(solution)
			}
		}
	}
	return capitalized_strings
}


const fetchCorpus = async () => {
	const response = await fetch(`
		https://rawcdn.githack.com/bobadeez/deez/
		31bd6d150a937a3b1d6ab32a6fb1bd8214c1cc65/
		data.json
		`)
	return await response.json()
}


fetchCorpus()
.then(data => {
	wordcost = data
	maxword = data.maxword
	delete wordcost.maxword
})
.then(() => {
	let stringArr = decode('murkymoistwhale')
	for (string of stringArr) {
		url = "https://thumbs2.redgifs.com/" + string + "-mobile.mp4"
		fetch(url).then(response => {
			console.log(response.json())
		})
	}
})

//"https://thumbs2.redgifs.com/MurkyMoistWhale-mobile.mp4"