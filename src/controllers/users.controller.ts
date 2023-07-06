import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { ICreateUser } from "interfaces/create-user.dto";
import { IUpdateUser } from "interfaces/update-user.dto";

const prisma = new PrismaClient();
const LIST_PER_PAGE = 10;

/* GET */
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const currentPage = req.query.page || 1;
		const listPerPage = LIST_PER_PAGE;
		const offset = ((currentPage as number) - 1) * listPerPage;

		const allUsers = await prisma.user.findMany({
			skip: offset,
			take: listPerPage,
		});
		res.json({
			data: allUsers,
			meta: { page: currentPage },
		});
	} catch (err) {
		next(createError(500, 'Something went wrong'));
	}
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: parseInt(req.params.id)
			}
		});
		res.status(200).json(user);
	} catch (err) {
		next(createError(500, 'Something went wrong'));
	}
}

/* POST */
const createUser = async (req: Request, res: Response, next: NextFunction) => {
	const { username, email, address, phone } = req.body;
	const userPhoneNumber = parseInt(phone)

	if (!username || !email) {
		next(createError(400, 'Either email or username is missing'));
	}

	try {
		const userData: ICreateUser = {
			username, email, address, phone: userPhoneNumber
		}
		const newUser = await prisma.user.create({
			data: userData,
		});

		return res.json(newUser);
	} catch (e) {
		next(createError(500, 'Something went wrong'));
	}
	next();
};

/* PUT */
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const updateUserData: IUpdateUser = {
			username: req.body.username,
			email: req.body.email,
			address: req.body.address,
			phone: req.body.phone,
		}
		
		const user = await prisma.user.update({
			where: {
				id: parseInt(req.body.id)
			},
			data: updateUserData
		});

		res.status(200).json(user);
	} catch (e) {
		next(createError(500, 'Something went wrong'));
	}
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const message = "user deleted successfully";
		await prisma.user.delete({
			where: {
				id: parseInt(req.body.id)
			}
		});

		return res.json({ message });
	} catch (e) {
		next(createError(500, 'Something went wrong'));
	}
}

module.exports = {
	createUser,
	getUsers,
	getUserById,
	updateUser,
	deleteUser
};