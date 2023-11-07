#!/usr/bin/python3
"""
This script consists of authentication routes
"""
from flask import Blueprint, request, jsonify, make_response, render_template
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from backend.models import User
from backend import db

auth = Blueprint('auth',__name__, url_prefix='/')

@auth.route('/signup', methods=['POST'])
def signup():
    """
    Registers users
    """
    if request.method == 'POST':
        data = request.json
        name = data.get('name')
        email = data.get('email')
        password1 = data.get('password1')
        password2 = data.get('password2')
        user = User.query.filter_by(email=email).first()
        if user:
            message = 'Email already exists'
            category = 'error'
            return jsonify({'message': message, 'category': category}), 409
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
            new_user = User(name=name, email=email, password=generate_password_hash(password1, method='sha256'))
            db.session.add(new_user)
            db.session.commit()
            login_user(user, remember=True)
            message = 'Account created!'
            category = 'success'
            return jsonify({"message": message, 'category': category}), 200
    return jsonify({"error": "Forbidden method"}), 400

@auth.route('/login', methods=['POST'])
def login():
    """
    login user
    """
    if request.method == 'POST':
        data = request.json
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                login_user(user, remember=True)
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
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200

@auth.route('/is_authenticated')
def isAuthenticated():
    # if current_user.is_authenticated is True:
    #     user_info = {
    #                     'id': current_user.id,
    #                     'name': current_user.name,
    #                     'email': current_user.email,
    #                     'isAuthenticated': current_user.is_authenticated
    #                 }
    #     return jsonify({'user': user_info}), 200
    return jsonify({"isAuthenticated": current_user.is_authenticated}), 200

@auth.route('/testing')
def test():
    return render_template('upload.html')