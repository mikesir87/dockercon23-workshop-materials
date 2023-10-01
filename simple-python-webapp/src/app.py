import random
from flask import Flask, render_template
app = Flask(__name__)

meme_urls = [
    "https://media.giphy.com/media/xUA7bfzccySdtHWUUg/giphy.gif",
    "https://media.giphy.com/media/mW05nwEyXLP0Y/giphy.gif",
    "https://media.giphy.com/media/qhhamrBnxSKNG/giphy.gif",
]

@app.route("/")
def index():
    message = "Hello world!"
    meme_url = random.choice(meme_urls)
    return render_template("index.html", message=message, meme_url=meme_url)

# This starts our Python app
if __name__ == "__main__":
    app.run(debug=True)