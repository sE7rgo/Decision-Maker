/*
The Borda count is a preferential, or ranked, voting system; the voter ranks the list of candidates in order of preference. So, for example, the voter gives a 1 to their most preferred candidate, a 2 to their second most preferred, and so on.

Points are then given to each candidate in reverse proportion to their ranking, so that higher-ranked candidates receive more points. When all votes have been counted, and the points added up, the candidate with the most points wins.

Ranking	Candidate	Formula	Points	Relative points
1st	    Andrew	    n	      5	      1.00
2nd	    Brian	      n−1	    4	      0.80
3rd	    Catherine	  n−2	    3	      0.60
4th	    David	      n−3	    2	      0.40
5th	    Elizabeth	  n−4	    1	      0.20
Taken from:  https://en.wikipedia.org/wiki/Borda_count

 ****** call function with rankings from Choices and from Voters new rankings ****
 ****** Whichever choice has the most point, wins!!! ***********
*/
const borda = function(rankingsFromDB, voterRankings) {  //these are arrays of rankings
  let count = voterRankings.length;
  let pointsArray = voterRankings;
  let finalArray = [];
  if (rankingsFromDB[0] !== 0) {
  for (let i = 1; i <= voterRankings.length; i++) {
    voterRankings[voterRankings.indexOf(i)] += count;
    count --;
  } console.log(voterRankings);
  for (let j = 0; j < pointsArray.length; j++) {
    finalArray[j] = pointsArray[j] + rankingsFromDB[j]
  }
  return finalArray;
} else {
      let initialRanking = voterRankings;
      return initialRanking;
    }
};

module.exports = {borda};
