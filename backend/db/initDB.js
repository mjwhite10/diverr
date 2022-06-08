require('dotenv').config();
const fs = require('fs/promises');
const path = require('path');
const uuid = require('uuid');
//const fs = require('fs/promises');
const bcrypt = require('bcrypt');
const faker = require('faker/locale/es');
const {
  processAndSaveImage,
  createPathIfNotExits,
  getRandomAvatar,
  deleteFile,
  getRandomFile,
  getRandomCover,
} = require('../helpers');
const { getConnection } = require('./getDB');

async function main() {
  let connection;
  try {
    console.log('Inicio del script');

    connection = await getConnection();

    console.log('Borrando las tablas existentes...');
    await connection.query('DROP TABLE IF EXISTS diverrs_comments');
    await connection.query('DROP TABLE IF EXISTS diverrs_solution');
    await connection.query('DROP TABLE IF EXISTS diverrs');
    await connection.query('DROP TABLE IF EXISTS diverrs_status');
    await connection.query('DROP TABLE IF EXISTS diverrs_categories');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log('Creando la tabla users');
    await connection.query(`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(100) UNIQUE NOT NULL,
            password TINYTEXT NOT NULL,
            role ENUM("normal", "admin") DEFAULT "normal" NOT NULL,
            name TINYTEXT NOT NULL,
            bio VARCHAR(500),
            avatar TINYTEXT,
            createdAt DATETIME NOT NULL,
            modifiedAt DATETIME,
            lastAuthUpdate DATETIME NOT NULL
        );`);

    console.log('Creando la tabla diverrs_categories');
    await connection.query(`
        CREATE TABLE diverrs_categories (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            description VARCHAR(100) NOT NULL
        );`);

    console.log('Creando la tabla diverrs_status');
    await connection.query(`
        CREATE TABLE diverrs_status (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            description VARCHAR(100) NOT NULL
        );`);

    console.log('Creando la tabla diverrs');
    await connection.query(`
        CREATE TABLE diverrs (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            idUser INTEGER NOT NULL,
            title VARCHAR(100) NOT NULL,
            info VARCHAR(500) NOT NULL,
            file VARCHAR(100),
            picture VARCHAR(100),
            price DOUBLE NOT NULL,
            idStatus INTEGER NOT NULL,
            idCategory INTEGER NOT NULL,
            createdAt DATETIME NOT NULL,
            modifiedAt DATETIME,
            FOREIGN KEY (idUser) REFERENCES users(id),
            FOREIGN KEY (idStatus) REFERENCES diverrs_status(id),
            FOREIGN KEY (idCategory) REFERENCES diverrs_categories(id)
            );`);

    console.log('Creando la tabla diverrs_solution');
    await connection.query(`
        CREATE TABLE diverrs_solution (
           id INTEGER PRIMARY KEY AUTO_INCREMENT,
           idDiverr INTEGER UNIQUE NOT NULL,
           idUser INTEGER NOT NULL,
           file VARCHAR (100),
           startedAt DATETIME NOT NULL,
           finishedAt DATETIME,
           markAsFinished TINYINT NOT NULL DEFAULT 0,
           FOREIGN KEY (idDiverr) REFERENCES diverrs(id),
           FOREIGN KEY (idUser) REFERENCES users(id)
           );`);

    console.log('Creando la tabla diverrs_comments');
    await connection.query(`
        CREATE TABLE diverrs_comments (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          content VARCHAR (280) NOT NULL,
          idUser INTEGER NOT NULL,
          idDiverr INTEGER NOT NULL,
          createdAt DATETIME NOT NULL,
          modifiedAt DATETIME,
          FOREIGN KEY (idUser) REFERENCES users(id),
          FOREIGN KEY (idDiverr) REFERENCES diverrs(id)
    );`);

    console.log('Creando usuarios administradores');

    const uploadAvatarPath = path.join(__dirname, '../uploads/avatar');
    const uploadDiverrsPath = path.join(__dirname, '../uploads/diverrs');
    const uploadSolutionsPath = path.join(__dirname, '../uploads/solutions');
    const uploadCoverPath = path.join(__dirname, '../uploads/covers');

    await deleteFile(uploadAvatarPath);
    await deleteFile(uploadDiverrsPath);
    await deleteFile(uploadSolutionsPath);
    await deleteFile(uploadCoverPath);

    await createPathIfNotExits(uploadAvatarPath);
    await createPathIfNotExits(uploadDiverrsPath);
    await createPathIfNotExits(uploadSolutionsPath);
    await createPathIfNotExits(uploadCoverPath);

    const avatar1 = await getRandomAvatar();
    const avatar2 = await getRandomAvatar();
    const avatar3 = await getRandomAvatar();
    const fileAdmin1 = await processAndSaveImage(avatar1, uploadAvatarPath);
    const fileAdmin2 = await processAndSaveImage(avatar2, uploadAvatarPath);
    const fileAdmin3 = await processAndSaveImage(avatar3, uploadAvatarPath);

    await connection.query(
      `
      INSERT INTO users (email,password,name,bio,role,lastAuthUpdate,avatar,modifiedAt,createdAt)
      VALUES('luna@hackaboss.com', ?, 'Luna', 'Lorem fistrum','admin',UTC_TIMESTAMP,?,UTC_TIMESTAMP,UTC_TIMESTAMP)
    `,
      [await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 8), fileAdmin1]
    );
    await connection.query(
      `
      INSERT INTO users (email,password,name,bio,role,lastAuthUpdate,avatar,modifiedAt,createdAt)
      VALUES('manu@hackaboss.com', ?, 'Manu', 'Lorem fistrum','admin',UTC_TIMESTAMP,?,UTC_TIMESTAMP,UTC_TIMESTAMP)
    `,
      [await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 8), fileAdmin2]
    );
    await connection.query(
      `
      INSERT INTO users (email,password,name,bio,role,lastAuthUpdate,avatar,modifiedAt,createdAt)
      VALUES('javi@hackaboss.com', ?, 'Javier', 'Lorem fistrum','admin',UTC_TIMESTAMP,?,UTC_TIMESTAMP,UTC_TIMESTAMP)
    `,
      [await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 8), fileAdmin3]
    );

    console.log('Creando usuarios normales...');
    const users = 10;

    for (let index = 0; index < users; index++) {
      const email = faker.internet.email();
      const password = await bcrypt.hash(process.env.DEFAULT_USER_PASSWORD, 8);
      const name = faker.name.findName();
      const bio = faker.lorem.sentences();
      const avatar = await getRandomAvatar();
      const file = await processAndSaveImage(avatar, uploadAvatarPath);
      await connection.query(
        `
        INSERT INTO users (email,password,name,bio,lastAuthUpdate,avatar,modifiedAt,createdAt)
        VALUES (?,?,?,?,UTC_TIMESTAMP,?,UTC_TIMESTAMP,UTC_TIMESTAMP)`,
        [email, password, name, bio, file]
      );
    }

    console.log('Creando status para los diverrs...');

    const diverr_status = ['Unassigned', 'Assigned', 'Completed'];

    for (let index = 0; index < diverr_status.length; index++) {
      await connection.query(
        `
        INSERT INTO diverrs_status (description)
        VALUES (?)`,
        [diverr_status[index]]
      );
    }

    console.log('Creando las categorias de los diverrs...');

    const diverrs_categories = [
      'Graphic arts and design',
      'Digital marketing',
      'Writing and translation',
      'Video and animation',
      'Music and sound',
      'Programming and technology',
      'Business',
      'Lifestyle',
      'Trends',
    ];

    for (let index = 0; index < diverrs_categories.length; index++) {
      await connection.query(
        `
        INSERT INTO diverrs_categories (description)
        VALUES (?)`,
        [diverrs_categories[index]]
      );
    }

    const diverrs = 50;

    console.log('Creando diverrs...');
    for (let i = 0; i < diverrs; i++) {
      //SERVICIOS
      const [users] = await connection.query('SELECT COUNT(*) FROM users');
      const [categories] = await connection.query(
        'SELECT COUNT(*) FROM diverrs_categories'
      );

      const idUser = Math.floor(1 + Math.random() * users[0]['COUNT(*)']);
      const title = faker.lorem.sentence();
      const info = faker.lorem.sentence();
      const diverr = await getRandomFile();
      //Generamos el nombre único con el que se guardará el archivo
      const diverName = `${uuid.v4()}${path.extname(diverr)}`;
      //Copiamos y renombramos el archivo con el uuid
      await fs.copyFile(diverr, path.join(uploadDiverrsPath, diverName));
      const idCategory = Math.floor(
        1 + Math.random() * categories[0]['COUNT(*)']
      );
      const price = Math.floor(1 + Math.random() * 1000);
      const picture = await getRandomCover();
      const coverImage = await processAndSaveImage(picture, uploadCoverPath);
      const [result] = await connection.query(
        `
        INSERT INTO diverrs (idUser,title,info,file,idStatus,idCategory,createdAt,picture,price)
        VALUES (?,?,?,?,2,?,UTC_TIMESTAMP,?,?)`,
        [idUser, title, info, diverName, idCategory, coverImage, price]
      );

      //COMENTARIOS
      for (let comment = 0; comment < 15; comment++) {
        const idUserComment = Math.floor(
          1 + Math.random() * users[0]['COUNT(*)']
        );
        const content = faker.lorem.sentence();

        await connection.query(
          `
        INSERT INTO diverrs_comments(idUser,idDiverr,content,createdAt)
        VALUES(?,?,?,UTC_TIMESTAMP)
        `,
          [idUserComment, result.insertId, content]
        );
      }

      //SOLUCION
      let idUserSolution;
      do {
        idUserSolution = Math.floor(1 + Math.random() * users[0]['COUNT(*)']);
      } while (idUserSolution == idUser);

      const solution = await getRandomFile();
      //Generamos el nombre único con el que se guardará el archivo
      const solutionName = `${uuid.v4()}${path.extname(solution)}`;
      //Copiamos y renombramos el archivo con el uuid
      await fs.copyFile(diverr, path.join(uploadSolutionsPath, solutionName));

      await connection.query(
        `
        INSERT INTO diverrs_solution (idUser,idDiverr,file,startedAt,markAsFinished)
        VALUES (?,?,?,UTC_TIMESTAMP,0)`,
        [
          idUserSolution,
          result.insertId,
          solutionName,
          solutionName,
          idCategory,
        ]
      );
    }

    console.log('Fin del script');
  } catch (error) {
    console.log('Error inesperado al crear la BBDD', error);
  } finally {
    if (connection) connection.release();
  }
}

main();
