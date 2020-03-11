import React from 'react';
import { Intent, Classes } from "@blueprintjs/core";
import { Product, ProductOption } from "resources/product";
import { CartItem, CartState } from 'store/cart/types';
import styles from './_styles.module.scss';
import { VoucherType } from 'resources/voucher';

export const PTClasses = {
  CallToAction: styles.cta,
}

export enum PriceFormat {
  FULL="full",
  SHORT="short",
}

export function countCartItems(cart: CartState) {
  return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
}

export function formatNumber(number: number) {
  return String(number).split(/(\d{0,3})(\d{3})$/).filter(Boolean).join('.');
}

export function formatPercentage(value: number) {
  return `${Math.floor(value)}%`;
}

export function formatPrice(price: number, type = PriceFormat.FULL) {
  switch (type) {
    case PriceFormat.FULL:
      return `${formatNumber(price)}₫`;
    case PriceFormat.SHORT:
      return `${formatNumber(price/1000)}k`;
  }
}

export const getIntent = (valid?: boolean) => {
  if (valid === true) return Intent.SUCCESS;
  if (valid === false) return Intent.DANGER;
  return Intent.NONE;
}

export const getDiscount = (cart: CartState) => {
  const items = Object.values(cart.items);
  return sumTotal(items) - sumTotal(items, cart.voucher);
}

export const getSubTotal = (item: CartItem, voucherCode?: string) => {
  const subtotal = item.quantity * item.product.price;
  const voucher = voucherCode &&
    item.product.vouchers &&
    item.product.vouchers.find(voucher => voucherCode.toUpperCase() === voucher.code.toUpperCase());
  if (!voucher) return subtotal;
  if (voucher.type === VoucherType.ABSOLUTE) return subtotal - voucher.value;
  return subtotal * (1 - voucher.value / 100);
}

export const getTotal = (cart: CartState) =>
  sumTotal(Object.values(cart.items), cart.voucher)

export const sumTotal = (items: CartItem[], voucherCode?: string) =>
  items.reduce((total, item) => total + getSubTotal(item, voucherCode), 0);

export const getFeature = (product: Product) => {
  if (!product.children) return "";
  const { options } = product;
  return <ul style={{ margin: 0, paddingLeft: 24 }} >{product.features.map(feature =>  {
    const selectedOption = feature.options.find(option => options.indexOf(option.id) > -1) as ProductOption;
    return (
      <li key={feature.id}>
        <span className={Classes.TEXT_MUTED}>{feature.name}:</span> {selectedOption.name}
      </li>
    )
  })}</ul>
}
