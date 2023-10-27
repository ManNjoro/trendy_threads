#!/usr/bin/python3
"""
This script consists of authentication routes
"""
from flask import Blueprint, request, jsonify, make_response
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
        elif not name or not email or not password1 or not password2:
            message = 'Please fill in all fields' 
            category = 'error'
        elif len(name) < 3:
            message = 'Name is too short'
            category = 'error'
        elif password1 != password2:
            message = 'Passwords do not match'
            category = 'error'
        elif len(password1) < 8:
            message = 'Password must be at least 8 characters'
            category = 'error'
        else:
            new_user = User(name=name, email=email, password=generate_password_hash(password1, method='sha256'))
            db.session.add(new_user)
            db.session.commit()
            message = 'Account created!'
            category = 'success'
        return jsonify({"message": message, 'category': category})
    return make_response(jsonify({"error": "Forbidden method"}), 400)

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
                message = 'Logged in successfully'
                category = 'success'
            else:
                message = 'Incorrect password'
                category = 'error'
        else:
            message = 'Email does not exist'
            category = 'error'
    return jsonify({'message': message, 'category': category})
