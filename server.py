from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)
from datetime import datetime

# DATA ARCHITECTURE
food_images = {
    "steak": "steak.jpg",
    "burgers": "burgers.jpg",
    "pasta": "pasta.jpg",
    "pizza": "pizza.jpg",
    "poultry": "poultry.jpg",
    "seafood": "seafood.jpg",
    "tacos": "tacos.jpg",
    "cheese": "cheese.jpg",
    "salmon": "salmon.jpg",
    "curry": "curry.jpg",
    "eggs": "eggs.jpg",
    "chips and salsa": "chips_salsa.jpg",
    "dessert": "dessert.jpg",
    "fruit": "fruit.jpg",
    "salad": "salad.jpg",
    "soft cheese": "soft_cheese.jpg",
}


# Wines
wines = {
    "1": {
        "id": "1",
        "name": "REDS",
        "image": "images/red.png",
        "trademarks": ["Red grapes", "Heavy", "Bitter"],
        "common": ["Cabernet Sauvignon", "Merlot", "Pinot Noir"],
        "audio-files": ["cabernet_sauvignon.wav", "merlot.wav", "pinot_noir.wav"],
        "food-names": ["STEAK", "BURGERS", "PASTA", "PIZZA"],
        "food-images": [food_images["steak"], food_images["burgers"], food_images["pasta"], food_images["pizza"]],
    },
    "2": {
        "id": "2",
        "name": "WHITES",
        "image": "images/white.png",
        "trademarks": ["White grapes", "Acidic", "Tart"],
        "common": ["Sauvignon Blanc", "Chardonnay", "Pinot Grigio"],
        "audio-files": ["sauvignon_blanc.wav", "chardonnay.wav", "pinot_grigio.wav"],
        "food-names": ["POULTRY", "SEAFOOD", "TACOS", "CHEESE"],
        "food-images": [food_images["poultry"], food_images["seafood"], food_images["tacos"], food_images["cheese"]],
    },
    "3": {
        "id": "3",
        "name": "ROSES",
        "image": "images/rose.png",
        "trademarks": ["Red grapes", "Acidic", "Sweet"],
        "common": ["Grenache", "Syrah", "Sangiovese"],
        "audio-files": ["grenache.wav", "syrah.wav", "sangiovese.wav"],
        "food-names": ["SALMON", "CURRY", "EGGS", "CHIPS & SALSA"],
        "food-images": [food_images["salmon"], food_images["curry"], food_images["eggs"], food_images["chips and salsa"]],
    },
    "4": {
        "id": "4",
        "name": "SPARKLINGS",
        "image": "images/sparkling.png",
        "trademarks": ["Red + white grapes", "Bubbly", "Sweet"],
        "common": ["Champagne", "Prosecco"],
        "audio-files": ["champagne.wav", "prosecco.wav"],
        "food-names": ["DESSERT", "FRUIT", "SALAD", "SOFT CHEESE"],
        "food-images": [food_images["dessert"], food_images["fruit"], food_images["salad"], food_images["soft cheese"]],
    },
}


# Quiz Questions
questions = {   
    "1": {
        "ques":"Merlot is what type of wine?",
        "options": [
            {"answer":"red", "img":"red.png","info":1},
            {"answer":"white", "img":"white.png", "info":2},
            {"answer":"rose", "img":"rose.png", "info":3},
            {"answer":"sparkling", "img":"sparkling.png", "info":4}
        ],
        "correct":1,
        "type":"wine types",
        "correct-info":1,
        "hint":"Pinot Noir is also a wine of this type!"
    },  
    "2": {
        "ques":"What are the trademarks of white wines?",
        "options": [
            {"answer":"Acidic & Sweet", "img":"", "info":3},
            {"answer":"Bubbly & Sweet", "img":"", "info":4},
            {"answer":"Acidic & Tart", "img":"", "info":2},
            {"answer":"Heavy & Bitter", "img":"", "info":1}
        ],
        "correct":3,
        "type":"wine types",
        "correct-info":2,
        "hint":"White wines are known for their sharp taste"
    }, 
    "3": {
        "ques":"Which wine would pair best with salmon?",
        "options": [
            {"answer":"red", "img":"red.png","info":1},
            {"answer":"white", "img":"white.png","info":2},
            {"answer":"rose", "img":"rose.png","info":3},
            {"answer":"sparkling", "img":"sparkling.png","info":4}
        ],
        "correct":3,
        "type":"food pairings",
        "correct-info":3,
        "hint":"This wine goes well with curry too!"
    },
    "4": {
        "ques":"Which food would pair best with red wine?",
        "options": [
            {"answer":"poultry", "img":food_images["poultry"],"info":2},
            {"answer":"pasta", "img":food_images["pasta"],"info":1},
            {"answer":"salad", "img":food_images["salad"],"info":4},
            {"answer":"eggs", "img":food_images["eggs"],"info":3}
        ],
        "correct":2,
        "type":"food pairings",
        "correct-info":1,
        "hint":"Poultry is better suited to white wine!"
    },
    "5": {
        "ques":"Prosecco is what type of wine?",
        "options": [
            {"answer":"red", "img":"red.png","info":1},
            {"answer":"white", "img":"white.png","info":2},
            {"answer":"rose", "img":"rose.png","info":3},
            {"answer":"sparkling", "img":"sparkling.png","info":4}
        ],
        "correct":4,
        "type":"wine types",
        "correct-info":4,
        "hint": "Prosecco is a highly aromatic wine with large, frothy bubbles."
    },
    "6": {
        "ques":"Which of the following is not a white wine?",
        "options": [
            {"answer":"Pinot grigio", "img":"","info":2},
            {"answer":"sangiovese", "img":"","info":3},
            {"answer":"sauvignon blanc", "img":"","info":2},
            {"answer":"chardonnay", "img":"","info":2}
        ],
        "correct":2,
        "type":"wine types",
        "correct-info":3,
        "hint": "Pinot grigio goes well with seafood, sangiovese with chicken, sauvignon blanc with poutry and chardonnay with cheese."
    },    
    "7": {
        "ques":"Which wine is described as heavy and bitter?",
        "options": [
            {"answer":"red", "img":"red.png","info":1},
            {"answer":"white", "img":"white.png","info":2},
            {"answer":"rose", "img":"rose.png","info":3},
            {"answer":"sparkling", "img":"sparkling.png","info":4}
        ],
        "correct":1,
        "type":"wine types",
        "correct-info":1,
        "hint": "Rose wines are acidic and sweet."
    },
    "8": {
        "ques":"Which food would pair best with white wine?",
        "options": [
            {"answer":"curry", "img":food_images["curry"],"info":3},
            {"answer":"steak", "img":food_images["steak"],"info":1},
            {"answer":"burgers", "img":food_images["burgers"],"info":1},
            {"answer":"tacos", "img":food_images["tacos"],"info":2}
        ],
        "correct":4,
        "type":"food pairings",
        "correct-info":2,
        "hint": "Burgers go well with red wine"
    },
    "9": {
        "ques":"Which food would not pair with sparkling wine?",
        "options": [
            {"answer":"seafood", "img":food_images["seafood"],"info":2},
            {"answer":"salad", "img":food_images["salad"],"info":4},
            {"answer":"fruit", "img":food_images["fruit"],"info":4},
            {"answer":"dessert", "img":food_images["dessert"],"info":4}
        ],
        "correct":1,
        "type":"food pairings",
        "correct-info":2,
        "hint":"White wine would be a better pairing for one of these."
    },
    "10": {
        "ques":"Which wine would pair best with chips & salsa?",
        "options": [
            {"answer":"red", "img":"red.png","info":1},
            {"answer":"white", "img":"white.png","info":2},
            {"answer":"rose", "img":"rose.png","info":3},
            {"answer":"sparkling", "img":"sparkling.png","info":4}
        ],
        "correct":3,
        "type":"food pairings",
        "correct-info":3,
        "hint":"Syrah is this kind of wine."
    },

}
past_score = {}
cur_num = 1

# User learn activity
learn_activity = []

# User scores
score = [0, 0, 0]

# ROUTES
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/learn/<num>')
def learn(num):
    global learn_activity
    if num == 'start':
        # Record that the user started learning
        now = datetime.now()
        current_time = now.strftime("%H:%M:%S")
        learn_activity.append(("START", current_time))
        print(learn_activity)
        return render_template('learn.html', wines=wines, wine="None")
    elif int(num) <= 0 or int(num) > 4:
        return render_template('learn.html', wines=wines, wine="None")
    else:
        # Keep a record of when the user clicks on each wine
        now = datetime.now()
        current_time = now.strftime("%H:%M:%S")
        learn_activity.append((wines[num]["name"], current_time))
        print(learn_activity)
        return render_template('learn.html', wines=wines, wine=wines[num])

@app.route('/quiz')
def quiz():
    global score
    # refresh score
    score = [0, 0, 0]
    return render_template('quiz.html')

@app.route('/quiz/<num>')
def start_quiz(num):
    return render_template('questions.html', qnum = num, question=questions[num], score=score, wines=wines)


@app.route('/quiz/end')
def end_quiz():
    global past_score
    global cur_num
    now = datetime.now()
    past_score[cur_num] = {
        "score": score[2],
        "datetime": datetime.strftime(now, '%B %d, %H:%M')
    }
    cur_num += 1
    return render_template('endquiz.html', score=score, datetime=datetime.now())


@app.route('/quiz/past_scores')
def pastscores_quiz():
    return render_template('pastscore.html', past_score=past_score)

# ajax call to update score
@app.route('/quiz/update_score', methods=['GET', 'POST'])
def save_sale():
    global score
    json_data = request.get_json() 
    #flag that indicates if the user answered the question correctly or not 
    to_update = json_data["is_correct"]
    type = json_data["type"]
    penalty = json_data["penalty"]
    print("update score")
    print(type)
    score_addition = 2
    if penalty:
        score_addition-=1
    # updating the score if answer was correct
    if (int(to_update)==1):
        if (type == "wine types"):
            print("wine")
            score[0]+=score_addition
        if (type == "food pairings"):
            score[1]+=score_addition
        score[2]+=score_addition
    #send back the updated score
    return jsonify(score=score)

if __name__ == '__main__':
    app.run(debug=True)
