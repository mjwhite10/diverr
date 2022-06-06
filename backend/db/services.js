const { generateError } = require('../helpers');
const { getConnection } = require('./getDB');

const searchServices = async (search, orderBy, orderDirection) => {
  let connection;
  try {
    connection = await getConnection();
    let queryResults;

    //Si se pasa un filtro de búsqueda...
    if (search) {
      queryResults = await connection.query(
        `
          SELECT S.id, S.idUser, U.name as user, S.title, S.info, S.file, SC.description as category, SS.description as status, S.createdAt
          FROM services AS S
          INNER JOIN services_categories AS SC
          ON S.idCategory = SC.id
          INNER JOIN services_status AS SS
          ON S.idStatus = SS.id
          INNER JOIN users AS U
          ON S.idUser = U.id
          WHERE S.title LIKE '%${search}%' OR info LIKE '%${search}%'
          ORDER BY ${orderBy} ${orderDirection}`
      );
    } else {
      queryResults = await connection.query(
        `
          SELECT S.id, S.idUser, U.name as user, S.title, S.info, S.file, SC.description as category, SS.description as status, S.createdAt
          FROM services AS S
          INNER JOIN services_categories AS SC
          ON S.idCategory = SC.id
          INNER JOIN services_status AS SS
          ON S.idStatus = SS.id
          INNER JOIN users AS U
          ON S.idUser = U.id
          ORDER BY ${orderBy} ${orderDirection}`
      );
    }
    //Extraemos los resultados en un array
    const [results] = queryResults;
    return results;
  } finally {
    if (connection) connection.release();
  }
};

const getServiceById = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [service] = await connection.query(
      `
        SELECT S.id, S.idUser, U.name as user, S.title, S.info, S.file, SC.description as category, SS.description as status, S.createdAt
        FROM services AS S
        INNER JOIN services_categories AS SC
        ON S.idCategory = SC.id
        INNER JOIN services_status AS SS
        ON S.idStatus = SS.id
        INNER JOIN users AS U
        ON S.idUser = U.id
        WHERE S.id = ?`,
      [id]
    );

    if (!service[0])
      throw generateError(`No existe ningún servicio con id ${id}`, 404);

    return service[0];
  } finally {
    if (connection) connection.release();
  }
};

const createService = async (idUser, title, info, file, category) => {
  let connection;
  try {
    connection = await getConnection();

    const [newService] = await connection.query(
      `
      INSERT INTO services (idUser,title, info, file, idCategory, idStatus, createdAt)
      VALUES(?,?,?,?,?,1,UTC_TIMESTAMP)
    `,
      [idUser, title, info, file, category]
    );
    return newService.insertId;
  } finally {
    if (connection) connection.release();
  }
};

const editServiceById = async (idService, title, info, file, category) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      `
      UPDATE services
      SET title = ?, info = ?, file = ?, idCategory = ?, modifiedAt = UTC_TIMESTAMP
      WHERE id = ?`,
      [title, info, file, category, idService]
    );
  } finally {
    if (connection) connection.release();
  }
};

const deleteServiceById = async (idService) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(`START TRANSACTION`);
    await connection.query(
      `
    DELETE FROM services_comments
    WHERE idService = ?`,
      [idService]
    );
    await connection.query(
      `
      DELETE FROM services
      WHERE id = ?`,
      [idService]
    );
    await connection.query(`COMMIT`);
  } catch (error) {
    await connection.query(`ROLLBACK`);
  } finally {
    if (connection) connection.release();
  }
};

const getServiceSolutionByIdService = async (idService) => {
  let connection;
  try {
    connection = await getConnection();
    const [solution] = await connection.query(
      `
      SELECT SS.id, SS.idUser, U.name as user, SS.file, SS.startedAt, SS.finishedAt
      FROM services_solution AS SS
      INNER JOIN users AS U
      ON SS.idUser = U.id
      WHERE SS.idService = ?`,
      [idService]
    );
    return solution[0];
  } finally {
    if (connection) connection.release();
  }
};

const createServiceSolution = async (idService, idUser) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(`START TRANSACTION`);
    const [newSolution] = await connection.query(
      `
      INSERT INTO services_solution (idService,idUser,startedAt)
      VALUES (?,?,UTC_TIMESTAMP)`,
      [idService, idUser]
    );
    await connection.query(
      `
      UPDATE services
      SET idStatus = 2
      WHERE id = ?`,
      [idService]
    );
    await connection.query(`COMMIT`);
    return newSolution.insertId;
  } catch (error) {
    await connection.query(`ROLLBACK`);
  } finally {
    if (connection) connection.release();
  }
};

const editServiceSolutionById = async (idService, file, finished) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(`START TRANSACTION`);

    if (finished.toLowerCase() === 'true') {
      await connection.query(
        `
      UPDATE services_solution
      SET file = ?, finishedAt = UTC_TIMESTAMP
      WHERE idService = ?`,
        [file, idService]
      );
      await connection.query(
        `
      UPDATE services
      SET idStatus = 3
      WHERE id = ?`,
        [idService]
      );
    } else {
      await connection.query(
        `
        UPDATE services_solution
        SET file = ?
        WHERE idService = ?`,
        [file, idService]
      );
    }
    await connection.query(`COMMIT`);
  } catch (error) {
    await connection.query(`ROLLBACK`);
  } finally {
    if (connection) connection.release();
  }
};

const deleteServiceSolutionById = async (idService) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(`START TRANSACTION`);

    console.log('Paso 1');
    await connection.query(
      `
    UPDATE services
    SET idStatus = 1
    WHERE id = ?`,
      [idService]
    );
    await connection.query(
      `
    DELETE FROM services_solution
    WHERE idService = ?`,
      [idService]
    );
    await connection.query(`COMMIT`);
  } catch (error) {
    await connection.query(`ROLLBACK`);
  } finally {
    if (connection) connection.release();
  }
};

const getIdCategory = async (category) => {
  let connection;
  try {
    connection = await getConnection();

    const [idCategory] = await connection.query(
      `SELECT id 
      FROM services_categories WHERE description = ? 
      `,
      [category]
    );
    if (!idCategory[0])
      throw generateError(`La categoria ${category} no existe`, 404);
    return idCategory[0];
  } finally {
    if (connection) connection.release();
  }
};

const createServiceComment = async (idUser, idService, content) => {
  let connection;
  try {
    connection = await getConnection();

    const [newServiceComment] = await connection.query(
      `
      INSERT INTO services_comments (idUser, idService, content, createdAt)
      VALUES(?,?,?,UTC_TIMESTAMP)
    `,
      [idUser, idService, content]
    );
    return newServiceComment.insertId;
  } finally {
    if (connection) connection.release();
  }
};

const editServiceCommentById = async (idService, idComment, content) => {
  let connection;
  try {
    connection = await getConnection();

    const [newServiceComment] = await connection.query(
      `
      UPDATE services_comments 
      SET content = ?, modifiedAt = UTC_TIMESTAMP
      WHERE idService = ? AND id = ?
    `,
      [content, idService, idComment]
    );
    return newServiceComment.insertId;
  } finally {
    if (connection) connection.release();
  }
};
const getServiceCommentById = async (idComment, idService) => {
  let connection;
  try {
    connection = await getConnection();
    const [comment] = await connection.query(
      `
      SELECT SC.id, SC.content, U.name, SC.idUser, SC.idService, SC.createdAt, SC.modifiedAt
      FROM services_comments AS SC
      INNER JOIN users AS U
      ON U.id = SC.idUser
      WHERE SC.id = ? AND SC.idService = ?`,
      [idComment, idService]
    );
    if (!comment[0])
      throw generateError(
        `No existe ningún comentario con id ${idComment}`,
        404
      );
    return comment[0];
  } finally {
    if (connection) connection.release();
  }
};

const deleteServiceCommentById = async (idComment) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(
      `
      DELETE FROM services_comments
      WHERE id = ?`,
      [idComment]
    );
  } finally {
    if (connection) connection.release();
  }
};

const getServiceComments = async (idService) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
      SELECT SC.id, SC.content, U.name, SC.idUser, SC.idService, SC.createdAt, SC.modifiedAt
      FROM services_comments AS SC
      INNER JOIN users AS U
      ON U.id = SC.idUser
      WHERE SC.idService = ?`,
      [idService]
    );
    return result;
  } finally {
    if (connection) connection.release();
  }
};
const getServiceCategories = async () => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
      SELECT id,description
      FROM services_categories`
    );
    return result;
  } finally {
    if (connection) connection.release();
  }
};
const getServiceStatus = async () => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
      SELECT id,description
      FROM services_status`
    );
    return result;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = {
  searchServices,
  getServiceSolutionByIdService,
  getServiceById,
  deleteServiceById,
  createServiceSolution,
  createService,
  getIdCategory,
  createServiceComment,
  deleteServiceCommentById,
  editServiceById,
  editServiceSolutionById,
  deleteServiceSolutionById,
  getServiceCommentById,
  getServiceComments,
  editServiceCommentById,
  getServiceCategories,
  getServiceStatus,
};
