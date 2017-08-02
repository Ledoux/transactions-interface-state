"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUserIn = isUserIn;
exports.isActiveUserIn = isActiveUserIn;
exports.isAdminUserIn = isAdminUserIn;
// REALLY NEEDED TO NOT BE IN AUTH !!
// Determine all the conditions
// hacky.
// TODO: smt like: !getStore().getState().user
function isUserIn() {
  return window.__INITIAL_STATE__.user && window.__INITIAL_STATE__.user.email;
}

function isActiveUserIn() {
  return isUserIn() && window.__INITIAL_STATE__.user.active;
}

function isAdminUserIn() {
  return isActiveUserIn() && window.__INITIAL_STATE__.user.admin;
}