#!/usr/bin/python3
"""
This script contains of all database models to be used
"""

from datetime import datetime
from flask_login import UserMixin
from pytz import timezone
from sqlalchemy.sql import func
from . import db
from uuid import uuid4
local_timezone = timezone('Africa/Nairobi')

def get_uuid():
    return uuid4().hex


class User(db.Model, UserMixin):
    """
    A user object
    """
    id = db.Column(db.String(11),unique=True, primary_key=True, default=get_uuid)
    name = db.Column(db.String(150))
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    orders = db.relationship('Order')

class Product(db.Model):
    """
    A product object
    """
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    price = db.Column(db.Integer)
    data = db.Column(db.LargeBinary)
    gender = db.Column(db.String(10))
    category = db.Column(db.String(20))
    size = db.Column(db.String(4))
    description = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=local_timezone.localize(datetime.now()))
    orders = db.relationship('Order')

class Order(db.Model):
    """
    Customer orders table
    """
    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    order_date = db.Column(db.DateTime(timezone=True), default=func.now())
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
