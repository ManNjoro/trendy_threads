#!/usr/bin/python3
"""
This script consists of api routes
"""
from io import BytesIO
from flask import abort, Blueprint, request, render_template, jsonify, send_file
from werkzeug.utils import secure_filename
from backend.models import Product
from backend import db

views = Blueprint('views',__name__, url_prefix='/')

CATEGORIES = ['shirt', 'jacket', 'short', 'trouser', 'lingerie', 'dress']
GENDERS = ['male', 'female']
SIZES = ['XS', 'S', 'M', 'L', 'XL']

ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg']
def allowed_file(filename):
    """
    validates file format
    """
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@views.route('/', methods=['GET','POST'])
def upload():
    """
    function for uploading files
    """
    message = ''
    if request.method == 'POST':
        name = request.form.get('name')
        price = request.form.get('price')
        category = request.form.get('category')
        gender = request.form.get('gender')
        size = request.form.get('size')
        description = request.form.get('description')
        file = request.files['file']
        if category not in CATEGORIES or gender not in GENDERS or size not in SIZES:
            message = "Amka enda ukafanye kazi!!Failure!!Failure!!"
        if 'file' not in request.files:
            message = "No file found"
        elif file.filename == '' or name == '' or price =='' or category =='' or gender =='' or size == '' or description == '':
            message = "Please fill in all fields"
        elif file and allowed_file(file.filename) and name and price and category and gender and size and description:
            filename = secure_filename(file.filename)
            file_data = file.read()
            new_upload = Product(name=name,price=price, data=file_data, category=category, gender=gender, size=size, description=description)
            db.session.add(new_upload)
            db.session.commit()
            message = f'Uploaded {filename} successfully'
    return render_template('upload.html', categories=CATEGORIES, sizes=SIZES, genders=GENDERS, message=message)

@views.route('/api/products')
def get_products():
    """
    Gets all products in the database
    """
    products = Product.query.all()
    
    # Convert the products to a list of dictionaries
    products = [{
        'id': product.id, 'name': product.name, 'price': product.price,
        'gender': product.gender,
        'category': product.category,
        'size': product.size,
        'description': product.description,
        'created_at': product.created_at} for product in products]
    
    return jsonify(products=products)


@views.route('/api/products/<int:product_id>')
def get_product(product_id):
    """
    Gets a single product's details
    """
    product = Product.query.filter_by(id=product_id).first()
    
    if product:
        # Construct the JSON response
        product_data = {
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'gender': product.gender,
            'category': product.category,
            'size': product.size,
            'description': product.description,
            'created_at': product.created_at
        }

        # Return both JSON response and the image file
        return jsonify(products = product_data), 200
    return jsonify({'error': "product not found"}), 404

@views.route('/api/products/<int:product_id>/image')
def get_product_image(product_id):
    '''
    Gets the product's image
    '''
    product = Product.query.filter_by(id=product_id).first()
    if product:
        return send_file(BytesIO(product.data), mimetype='image/*')
    else:
        return jsonify({'error': "product not found"}), 404


@views.route('/products/<int:product_id>', methods=['GET','DELETE'])
def delete_product(product_id):
    """
    deletes product by id
    """
    product = Product.query.filter_by(id=product_id).first()
    if not product:
        abort(404)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'successfully deleted!'}), 200
