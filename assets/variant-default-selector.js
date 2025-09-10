// Variant Default Selector - Markiert erste verfügbare Variante als ausgewählt
function markFirstVariantAsSelected() {
  // Finde alle möglichen Varianten-Gruppen
  const variantGroups = document.querySelectorAll('.template-product .variant-group, .template-product .variant-swatch-list, .template-product .product-form__option');
  
  variantGroups.forEach(function(group) {
    // Finde alle verfügbaren Varianten in dieser Gruppe
    const availableVariants = group.querySelectorAll('.block-swatch__item:not(.is-disabled)');
    
    if (availableVariants.length > 0) {
      // Entferne is-selected von allen Varianten in dieser Gruppe
      group.querySelectorAll('.block-swatch__item').forEach(function(variant) {
        variant.classList.remove('is-selected');
        variant.setAttribute('aria-checked', 'false');
      });
      
      // Markiere die erste verfügbare Variante als ausgewählt
      const firstVariant = availableVariants[0];
      firstVariant.classList.add('is-selected');
      firstVariant.setAttribute('aria-checked', 'true');
      
      // Aktualisiere auch das versteckte Radio-Input falls vorhanden
      const radioInput = firstVariant.querySelector('input[type="radio"]');
      if (radioInput) {
        radioInput.checked = true;
      }
    }
  });
  
  // Zusätzlich: Markiere alle ersten Block-Swatch Items als ausgewählt
  const firstBlockSwatches = document.querySelectorAll('.template-product .block-swatch:first-child .block-swatch__item');
  firstBlockSwatches.forEach(function(variant) {
    if (!variant.classList.contains('is-disabled')) {
      variant.classList.add('is-selected');
      variant.setAttribute('aria-checked', 'true');
    }
  });
}

// Sofort beim Laden ausführen
markFirstVariantAsSelected();

// Auch beim DOMContentLoaded Event
document.addEventListener('DOMContentLoaded', function() {
  markFirstVariantAsSelected();
});

// Beim Variant-Change Event reagieren
document.addEventListener('variant:changed', function() {
  setTimeout(markFirstVariantAsSelected, 50);
});

// Beim Product-Rerender Event reagieren
document.addEventListener('product:rerender', function() {
  setTimeout(markFirstVariantAsSelected, 100);
});

// Auch beim Window Load Event
window.addEventListener('load', function() {
  markFirstVariantAsSelected();
});
