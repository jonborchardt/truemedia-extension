// specific implementation for twitter

function appendTrueMediaButtons(createBtn) {
  // find all places there is a shareable link... tweets, posts, toks etc...
  const tweets = document.querySelectorAll('article[data-testid="tweet"]');
  // for each
  tweets.forEach((tweet) => {
    // get a link to pass to TrueMedia
    const tweetLink = tweet.querySelector('a[href*="/status/"]');
    if (tweetLink) {
      const tweetURL = tweetLink.href;
      // get an id for use in determining if we already added a button
      const tweetID = tweetURL.split('/status/')[1];
      const isAnalytics = tweetID.split('/'); // if we end in '/analytics', we also don't want to add a button
      const selectId = `true-media-${tweetID}`;
      // if we have not already made a button
      if (isAnalytics.length == 1 && !document.querySelector(`#${selectId}`)) {
        // call passed in function to make a button
        const newButton = createBtn(selectId, tweetURL);
        // and add it in the right place
        tweetLink.insertAdjacentElement('afterend', newButton);
      }
    }
  });
}

window.init(appendTrueMediaButtons, 1000);
