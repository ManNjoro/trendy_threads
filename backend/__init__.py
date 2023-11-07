"""
Flask app setup
"""
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

db = SQLAlchemy()
DB_PATH = 'trendy_threads.db'
migrate = Migrate()

def create_app():
    """
    creates a flask app
    """
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_PATH}'
    app.config['SECRET_KEY'] = 'saferinnumbers'
    app.url_map.strict_slashes = False
    from backend.auth import auth
    from backend.views import views

    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(auth)
    app.register_blueprint(views)
    from backend.models import User, Product, Order
    create_database(app)
    
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))
    
    return app

def create_database(app):
    """
    creates the sqlite database
    """
    with app.app_context():
        if not os.path.exists('backend/' + DB_PATH):
            db.create_all()
            print("Created database!")
