#!/usr/bin/python3
"""
This script consists of authentication routes
"""

from flask import Blueprint, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from backend.models import User
from backend import db

# Define a Blueprint named 'auth' with a URL prefix of '/'
auth = Blueprint('auth', __name__, url_prefix='/')

@auth.route('/signup', methods=['POST'])
def signup():
    """
    Route: /signup (POST)
    Registers users.
    """
    if request.method == 'POST':
        data = request.json
        name = data.get('name')
        email = data.get('email')
        password1 = data.get('password1')
        password2 = data.get('password2')

        # Check if the email already exists
        user = User.query.filter_by(email=email).first()
        if user:
            message = 'Email already exists'
            category = 'error'
            return jsonify({'message': message, 'category': category}), 409
        # Validate input fields
        elif not name or not email or not password1 or not password2:
            message = 'Please fill in all fields' 
            category = 'error'
            return jsonify({'message': message, 'category': category}), 400
        elif len(name) < 3:
            message = 'Name is too short'
            category = 'error'
            return jsonify({'message': message, 'category': category}), 400
        elif password1 != password2:
            message = 'Passwords do not match'
            category = 'error'
            return jsonify({'message': message, 'category': category}), 400
        elif len(password1) < 8:
            message = 'Password must be at least 8 characters'
            category = 'error'
            return jsonify({'message': message, 'category': category}), 400
        else:
            # Create a new user and add to the database
            new_user = User(name=name, email=email, password=generate_password_hash(password1, method='pbkdf2:sha256'))
            db.session.add(new_user)
            db.session.commit()
            # Log in the newly created user
            login_user(new_user, remember=True)
            message = 'Account created!'
            category = 'success'
            return jsonify({"message": message, 'category': category}), 200
    return jsonify({"error": "Forbidden method"}), 400

@auth.route('/login', methods=['POST'])
def login():
    """
    Route: /login (POST)
    Logs in a user.
    """
    if request.method == 'POST':
        data = request.json
        email = data.get('email')
        password = data.get('password')

        # Query user by email
        user = User.query.filter_by(email=email).first()
        if user:
            # Check if the password matches
            if check_password_hash(user.password, password):
                # Log in the user
                login_user(user, remember=True)
                # Get user information for response
                user_info = {
                    'id': current_user.id,
                    'name': current_user.name,
                    'email': current_user.email,
                    'isAuthenticated': current_user.is_authenticated
                }
                return jsonify({'message': 'Logged in successfully', 'category': 'success', 'user': user_info}), 200
            else:
                message = 'Incorrect password'
                category = 'error'
                return jsonify({'message': message, 'category': category}), 401
        else:
            message = 'Email does not exist'
            category = 'error'
            return jsonify({'message': message, 'category': category}), 401
    return jsonify({'error': 'method not allowed'}), 405

@auth.route('/logout')
@login_required
def logout():
    """
    Route: /logout
    Logs out the currently authenticated user.
    """
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200
