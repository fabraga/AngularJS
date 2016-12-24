function detectItem(detect, items) {
  for (var i = 0 ; i < items.length ; i++) {
    if ( items[i].toLowerCase().indexOf(detect) !== -1 ) {
      return true;
    }
  }
  return false;
}
