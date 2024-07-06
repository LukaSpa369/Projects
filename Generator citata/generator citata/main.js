document.addEventListener("DOMContentLoaded", () => {
    const quoteText = document.getElementById("quote");
    const authorText = document.getElementById("author");
    const tweetButton = document.getElementById("tweet");
    const nextButton = document.getElementById("next2");

    async function fetchQuote() {
        try {
            const response = await fetch('https://apis.nervesys.com/api/286ac91b-c436-44bd-9089-1184bd22bf45');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            displayQuote(data);
        } catch (error) {
            quoteText.textContent = "An error occurred while fetching the quote.";
            authorText.textContent = "";
            console.error('Error fetching the quote:', error);
        }
    }

    function displayQuote(data) {
        if (data && data.length > 0) {
            const quoteObject = data[Math.floor(Math.random() * data.length)];
            const quote = quoteObject.text || quoteObject.quote; 
            const author = quoteObject.author || 'Unknown'; 
            quoteText.textContent = `"${quote}"`;
            authorText.textContent = `- ${author}`;
    
            tweetButton.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`;
        } else {
            quoteText.textContent = "Failed to fetch a quote.";
            authorText.textContent = "";
            tweetButton.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - Unknown`)}`;
        }
    }
    

    nextButton.addEventListener("click", fetchQuote);

    fetchQuote();
});
