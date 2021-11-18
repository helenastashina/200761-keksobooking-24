const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR_URL = 'img/muffin-grey.svg';
const avatarChooserElement = document.querySelector('.ad-form-header__input');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const photoChooserElement = document.querySelector('.ad-form__input');
const photoPreviewElement = document.querySelector('.ad-form__photo');

const clearFilePreview = () => {
  avatarPreviewElement.src = DEFAULT_AVATAR_URL;
  photoPreviewElement.innerHTML = '';
};

avatarChooserElement.addEventListener('change', () => {
  const file = avatarChooserElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
});

photoChooserElement.addEventListener('change', () => {
  const file = photoChooserElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const preview = document.createElement('img');
    preview.src = URL.createObjectURL(file);
    preview.style.objectFit = 'cover';
    preview.style.objectPosition = 'center';
    preview.style.width = '100%';
    preview.style.height = '100%';
    photoPreviewElement.appendChild(preview);
  }
});

export {clearFilePreview};
