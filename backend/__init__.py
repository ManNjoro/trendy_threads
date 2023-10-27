"""
Flask app setup
"""
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
DB_PATH = 'trendy_threads.db'

def create_app():
    """
    creates a flask app
    """
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_PATH}'
    app.url_map.strict_slashes = False
    from backend.auth import auth
    from backend.views import views

    db.init_app(app)

    app.register_blueprint(auth)
    app.register_blueprint(views)
    from backend.models import User, Product, Order
    create_database(app)
    
    return app

def create_database(app):
    """
    creates the sqlite database
    """
    with app.app_context():
        if not os.path.exists('backend/' + DB_PATH):
            db.create_all()
            print("Created database!")
