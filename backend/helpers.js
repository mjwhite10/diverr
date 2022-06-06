const bcrypt = require('bcrypt');
const fs = require('fs/promises');
const path = require('path');
const uuid = require('uuid');
const sharp = require('sharp');
//Esta es una función que nos devuleve un error con su estado
const generateError = (message, status) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};

//Funcion que compara una password con otra encriptada
const checkPassword = async (password, encryptedPassword) => {
  //Comparamos las passwords
  const validPassword = await bcrypt.compare(password, encryptedPassword);
  //Si la password no es valida...
  if (!validPassword) throw generateError('La contraseña no es válida', 401);
};

//Función que encripta una pasword
const encryptPassword = async (password) => {
  return await bcrypt.hash(password, 8);
};
//Función que crea un directorio si este no existe
const createPathIfNotExits = async (path) => {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path, { recursive: true });
  }
};

//Función que procesa las imagenes y las almacena en el servidor
const processAndSaveImage = async (uploadedImage, imageUploadPath) => {
  // Leer la imagen que se subio
  const image = sharp(uploadedImage);
  // Saco información de la imagen
  const imageInfo = await image.metadata();

  // Cambiarle el tamaño si es necesario
  if (imageInfo.width > 1000) {
    image.resize(1000);
  }

  // Guardar la imagen en el directorio de subidas
  const imageFileName = `${uuid.v4()}.jpg`;
  await image.toFile(path.join(imageUploadPath, imageFileName));

  // Devolver el nombre con el que fue guardada
  return imageFileName;
};

//Función que copia un archivo en la direción especificada
const processAndSaveFile = async (uploadedFile, fileUploadPath) => {
  //Generamos el nombre del archivo=>uid+extension
  const fileName = `${uuid.v4()}${path.extname(uploadedFile.name)}`;
  //Copiamos el contenido del archivo y lo renombramos
  await fs.writeFile(path.join(fileUploadPath, fileName), uploadedFile.data);
  return fileName;
};

//Función que elimina un directorio de forma recursiva
const deleteFile = async (path) => {
  try {
    await fs.rm(path, { recursive: true });
  } catch (error) {
    console.log(error);
  }
};

//Función que devuelve un avatar random
const getRandomAvatar = async () => {
  let avatarImages = await fs.readdir(
    path.join(__dirname, '/testing/avatares')
  );
  let avatar = avatarImages[Math.floor(Math.random() * avatarImages.length)];
  return await fs.readFile(path.join(__dirname, `/testing/avatares/${avatar}`));
};

//Función que devuelve un fichero random
const getRandomFile = async () => {
  let diverrsFiles = await fs.readdir(path.join(__dirname, '/testing/files'));

  let file = path.join(
    __dirname,
    `/testing/files/${
      diverrsFiles[Math.floor(Math.random() * diverrsFiles.length)]
    }`
  );
  return file;
};
//Función que devuelve una protada random
const getRandomCover = async () => {
  //Leemos el directorio
  let coverImage = await fs.readdir(path.join(__dirname, '/testing/portadas'));
  //Seleccionamos una imagen de forma aleatoria
  let cover = coverImage[Math.floor(Math.random() * coverImage.length)];
  //Devolvemos la imagen
  return await fs.readFile(path.join(__dirname, `/testing/portadas/${cover}`));
};

module.exports = {
  generateError,
  createPathIfNotExits,
  processAndSaveImage,
  deleteFile,
  checkPassword,
  encryptPassword,
  getRandomAvatar,
  getRandomFile,
  processAndSaveFile,
  getRandomCover,
};
