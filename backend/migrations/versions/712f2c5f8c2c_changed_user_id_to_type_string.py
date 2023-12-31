"""changed user.id to type string

Revision ID: 712f2c5f8c2c
Revises: 
Create Date: 2023-10-28 21:10:20.093259

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '712f2c5f8c2c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=11),
               existing_nullable=False)
        batch_op.create_unique_constraint('unique_user_id', ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint('unique_user_id', type_='unique')
        batch_op.alter_column('id',
               existing_type=sa.String(length=11),
               type_=sa.INTEGER(),
               existing_nullable=False)

    # ### end Alembic commands ###
