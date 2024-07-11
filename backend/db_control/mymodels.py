from sqlalchemy import ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from datetime import datetime

class Base(DeclarativeBase):
    # ベースクラス。全てのモデルクラスはこれを継承する。
    pass


class Customers(Base):
    # Customersクラス。顧客情報を表す。
    __tablename__ = 'customers'
    customer_id:Mapped[str] = mapped_column(primary_key=True)  # 顧客ID。主キー。
    customer_name:Mapped[str] = mapped_column()  # 顧客名。
    age:Mapped[int] = mapped_column()  # 顧客の年齢。
    gender:Mapped[str] = mapped_column()  # 顧客の性別。

class Items(Base):
    # Itemsクラス。商品情報を表す。
    __tablename__ = 'items'
    item_id:Mapped[str] = mapped_column(primary_key=True)  # 商品ID。主キー。
    item_name:Mapped[str] = mapped_column()  # 商品名。
    price:Mapped[int] = mapped_column()  # 価格。

class Purchases(Base):
    # Purchasesクラス。購入情報を表す。
    __tablename__ = 'purchases'
    purchase_id:Mapped[int] = mapped_column(primary_key=True, autoincrement=True)  # 購入ID。主キーで自動増分。
    purchase_name:Mapped[str] = mapped_column(ForeignKey("customers.customer_id"))  # 顧客ID。外部キー。
    date:Mapped[datetime] = mapped_column()  # 購入日時。

class PurchaseDetails(Base):
    # PurchaseDetailsクラス。購入詳細情報を表す。
    __tablename__ = 'purchase_details'
    purchase_id:Mapped[int] = mapped_column(ForeignKey("purchases.purchase_id"), primary_key=True)  # 購入ID。外部キーで主キー。
    item_name:Mapped[str] = mapped_column(ForeignKey("items.item_id"), primary_key=True)  # 商品ID。外部キーで主キー。
    quantity:Mapped[int] = mapped_column()  # 購入数量。
