function toggleWishlist(productID, productTitle, productImg, productPrice, productUrl) {
  const pdpData = {
    productID: productID,
    productTitle: productTitle,
    productImg: productImg,
    productPrice: productPrice,
    productUrl: productUrl,
  };

  let wishlistData = JSON.parse(localStorage.getItem('wishlist')) || [];
  const isAlreadyInWishlist = wishlistData.some((item) => item.productID === pdpData.productID);
  const wishlistButton = document.getElementsByClassName('wishlist_button')[0];

  if (!isAlreadyInWishlist) {
    wishlistData.push(pdpData);
    localStorage.setItem('wishlist', JSON.stringify(wishlistData));
    // alert(`Product added to wishlist: ${pdpData.productTitle}`);
    Swal.fire({
      icon: 'success',
      title: 'Product added to wishlist',
      text: `${productTitle} added`,
      showConfirmButton: false,
      timer: 1500,
    });
    wishlistButton.innerHTML = `<svg class="heart-filled" width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.3 5.71002C18.841 5.24601 18.2943 4.87797 17.6917 4.62731C17.0891 4.37666 16.4426 4.2484 15.79 4.25002C15.1373 4.2484 14.4909 4.37666 13.8883 4.62731C13.2857 4.87797 12.739 5.24601 12.28 5.71002L12 6.00002L11.72 5.72001C10.7917 4.79182 9.53273 4.27037 8.22 4.27037C6.90726 4.27037 5.64829 4.79182 4.72 5.72001C3.80386 6.65466 3.29071 7.91125 3.29071 9.22002C3.29071 10.5288 3.80386 11.7854 4.72 12.72L11.49 19.51C11.6306 19.6505 11.8212 19.7294 12.02 19.7294C12.2187 19.7294 12.4094 19.6505 12.55 19.51L19.32 12.72C20.2365 11.7823 20.7479 10.5221 20.7442 9.21092C20.7405 7.89973 20.2218 6.64248 19.3 5.71002Z" fill="#000000"/>
          </svg>
          <p class="wishlist_text">In Your Wishlist</p>
      `;
  } else {
    wishlistData = wishlistData.filter((item) => item.productID !== pdpData.productID);
    localStorage.setItem('wishlist', JSON.stringify(wishlistData));
    // alert(`Product removed from wishlist: ${pdpData.productTitle}`);
    Swal.fire({
      icon: 'success',
      title: 'Product removed from wishlist',
      text: `${productTitle} removed from wishlist: `,
      showConfirmButton: false,
      timer: 1500,
    });
    wishlistButton.innerHTML = `<svg class="heart-outline" width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
   
          <rect x="0" fill="none" width="24" height="24"/>
          
          <g>
          
          <path d="M16.5 4.5c2.206 0 4 1.794 4 4 0 4.67-5.543 8.94-8.5 11.023C9.043 17.44 3.5 13.17 3.5 8.5c0-2.206 1.794-4 4-4 1.298 0 2.522.638 3.273 1.706L12 7.953l1.227-1.746c.75-1.07 1.975-1.707 3.273-1.707m0-1.5c-1.862 0-3.505.928-4.5 2.344C11.005 3.928 9.362 3 7.5 3 4.462 3 2 5.462 2 8.5c0 5.72 6.5 10.438 10 12.85 3.5-2.412 10-7.13 10-12.85C22 5.462 19.538 3 16.5 3z"/>
          
          </g>
          
          </svg>
          <p class="wishlist_text">Not In Wishlist</p>
      `;
  }

  // Update the display after modifying the wishlist
  displayWishlist();
  // Update the wishlist count
  updateWishlistCount();
}

// Remove the specified product from the wishlist
function removeFromWishlist(productID) {
  let wishlistData = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlistData = wishlistData.filter((item) => item.productID !== productID);
  localStorage.setItem('wishlist', JSON.stringify(wishlistData));
  // Update the display after removing from the wishlist
  displayWishlist();
  // Update the wishlist count
  updateWishlistCount();
}

// Clear all products from the wishlist
function clearWishlist() {
  localStorage.removeItem('wishlist');
  alert('All products have been removed from the wishlist.');
  // Update the display after clearing the wishlist
  displayWishlist();
  // Update the wishlist count
  updateWishlistCount();
}

// Display wishlist items
function displayWishlist() {
  const wishlistData = JSON.parse(localStorage.getItem('wishlist')) || [];

  if (wishlistData.length === 0) {
    console.log('Wishlist is empty');
    const wishlistBlock = document.querySelector('.js-wishlistBlock');
    if (wishlistBlock) {
      wishlistBlock.innerHTML = '<tr><td colspan="6">Your wishlist is empty</td></tr>';
    }
    return;
  }

  const wishlistHtml = wishlistData
    .map(
      (item) => `
                 <tr>
                        <td class="tp-cart-img">
                          <a href="${item.productUrl}"> <img src="${item.productImg}" alt="${item.productTitle}" width="10px" height="10px"></a>
                        </td>
                        <td class="tp-cart-title"><a href="${item.productUrl}">${item.productTitle}</a></td>
                        <td class="tp-cart-price"><span>${item.productPrice}</span></td>
                        
        
                        <td class="tp-cart-add-to-cart">
                          <a href="${item.productUrl}">
                          <button type="submit" class="tp-btn tp-btn-2 tp-btn-blue">View Product</button>
                          </a>
                        </td>
                        <td class="tp-cart-action">
                          <button class="tp-cart-action-btn" onclick="removeFromWishlist('${item.productID}')">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.53033 1.53033C9.82322 1.23744 9.82322 0.762563 9.53033 0.46967C9.23744 0.176777 8.76256 0.176777 8.46967 0.46967L5 3.93934L1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L3.93934 5L0.46967 8.46967C0.176777 8.76256 0.176777 9.23744 0.46967 9.53033C0.762563 9.82322 1.23744 9.82322 1.53033 9.53033L5 6.06066L8.46967 9.53033C8.76256 9.82322 9.23744 9.82322 9.53033 9.53033C9.82322 9.23744 9.82322 8.76256 9.53033 8.46967L6.06066 5L9.53033 1.53033Z" fill="currentColor"/>
                            </svg>
                            <span>Remove</span>
                          </button>
                        </td>
                      </tr>   
           `
    )
    .join('');

  const wishlistBlock = document.querySelector('.js-wishlistBlock');

  // Add a check to ensure the element is not null before setting innerHTML
  if (wishlistBlock) {
    wishlistBlock.innerHTML = wishlistHtml;
  } else {
    console.error('Element with class "js-wishlistBlock" not found');
  }
}

// Function to update the wishlist count display
function updateWishlistCount() {
  const wishlistData = JSON.parse(localStorage.getItem('wishlist')) || [];
  const wishlistCountElement = document.querySelector('.wishlist_count');
  if (wishlistCountElement) {
    wishlistCountElement.textContent = `${wishlistData.length}`;
  } else {
    console.error('Element with class "wishlist_count" not found');
  }
}

// Execute this function on DOM content load
document.addEventListener('DOMContentLoaded', function () {
  // Fetch the wishlist data from localStorage
  const wishlistData = JSON.parse(localStorage.getItem('wishlist')) || [];

  // Set the initial button text based on whether the product is in the wishlist or not
  const wishlistButton = document.querySelector('.wishlist_button'); // Use querySelector instead of getElementsByClassName
  const productID = '{{ product.id }}';

  if (wishlistButton) {
    const isAlreadyInWishlist = wishlistData.some((item) => item.productID === productID);
    wishlistButton.innerHTML = isAlreadyInWishlist
      ? `<svg class="heart-filled" width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.3 5.71002C18.841 5.24601 18.2943 4.87797 17.6917 4.62731C17.0891 4.37666 16.4426 4.2484 15.79 4.25002C15.1373 4.2484 14.4909 4.37666 13.8883 4.62731C13.2857 4.87797 12.739 5.24601 12.28 5.71002L12 6.00002L11.72 5.72001C10.7917 4.79182 9.53273 4.27037 8.22 4.27037C6.90726 4.27037 5.64829 4.79182 4.72 5.72001C3.80386 6.65466 3.29071 7.91125 3.29071 9.22002C3.29071 10.5288 3.80386 11.7854 4.72 12.72L11.49 19.51C11.6306 19.6505 11.8212 19.7294 12.02 19.7294C12.2187 19.7294 12.4094 19.6505 12.55 19.51L19.32 12.72C20.2365 11.7823 20.7479 10.5221 20.7442 9.21092C20.7405 7.89973 20.2218 6.64248 19.3 5.71002Z" fill="#000000"/>
          </svg> <p class="wishlist_text">In Your Wishlist</p>`
      : `<svg width="35px" height="35px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="heart-outline">
          
          <rect x="0" fill="none" width="24" height="24"/>
          
          <g>
          
          <path d="M16.5 4.5c2.206 0 4 1.794 4 4 0 4.67-5.543 8.94-8.5 11.023C9.043 17.44 3.5 13.17 3.5 8.5c0-2.206 1.794-4 4-4 1.298 0 2.522.638 3.273 1.706L12 7.953l1.227-1.746c.75-1.07 1.975-1.707 3.273-1.707m0-1.5c-1.862 0-3.505.928-4.5 2.344C11.005 3.928 9.362 3 7.5 3 4.462 3 2 5.462 2 8.5c0 5.72 6.5 10.438 10 12.85 3.5-2.412 10-7.13 10-12.85C22 5.462 19.538 3 16.5 3z"/>
          
          </g>
          
          </svg>
          <p class="wishlist_text">Not In Wishlist</p>
       `;
  } else {
    console.error('Element with class "wishlist_button" not found');
  }

  // Display wishlist items
  displayWishlist();
  // Update the wishlist count
  updateWishlistCount();
});
