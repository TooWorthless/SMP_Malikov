// ЗАВДАННЯ №1 (Спроектуйте базову структуру для різних типів контенту)
// Базовий інтерфейс для всього контенту
interface BaseContent {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt?: Date;
	status: 'draft' | 'published' | 'archived';
}

// Ваше завдання: розширити цю систему для різних типів контенту
interface Article extends BaseContent {
	title: string;
	body: string;
	tags: string[];
}

interface Product extends BaseContent {
	name: string;
	price: number;
	stock: number;
	category: string;
}

// Створіть generic тип для операцій з контентом
type ContentOperations<T extends BaseContent> = {
	create: (content: T) => T;
	read: (id: string) => T | null;
	update: (id: string, updates: Partial<T>) => T | null;
	delete: (id: string) => boolean;
};



// ЗАВДАННЯ №2 (Розробіть систему типів для управління правами доступу)
// Визначте базові ролі та права
type Role = 'admin' | 'editor' | 'viewer';

type Permission = {
	create: boolean;
	read: boolean;
	update: boolean;
	delete: boolean;
};

// Ваше завдання: створити систему прав доступу
type AccessControl<T extends BaseContent> = {
	[role in Role]: Permission;
};

// Приклад
const articleAccess: AccessControl<Article> = {
	admin: { create: true, read: true, update: true, delete: true },
	editor: { create: true, read: true, update: true, delete: false },
	viewer: { create: false, read: true, update: false, delete: false },
};



// ЗАВДАННЯ №3 (Створіть систему валідації)
// Базовий тип валідатора
type Validator<T> = {
	validate: (data: T) => ValidationResult;
};

type ValidationResult = {
	isValid: boolean;
	errors?: string[];
};

const articleValidator: Validator<Article> = {
	validate: (data) => {
		const errors: string[] = [];
		if (!data.title) errors.push('Title is required.');
		if (!data.body) errors.push('Body is required.');
		return { isValid: errors.length === 0, errors };
	},
};

const productValidator: Validator<Product> = {
	validate: (data) => {
		const errors: string[] = [];
		if (!data.name) errors.push('Name is required.');
		if (data.price <= 0) errors.push('Price must be greater than zero.');
		return { isValid: errors.length === 0, errors };
	},
};



// ЗАВДАННЯ №4 (Реалізуйте систему версіонування контенту)
type Versioned<T extends BaseContent> = T & {
	version: number;
	history: T[];
};

// Приклад створення версії контенту
const createVersionedContent = <T extends BaseContent>(content: T): Versioned<T> => ({
	...content,
	version: 1,
	history: [],
});

// Приклад оновлення
const updateVersion = <T extends BaseContent>(
	content: Versioned<T>,
	updates: Partial<T>
): Versioned<T> => {
	const updatedContent = { ...content, ...updates, updatedAt: new Date() };
	return {
		...updatedContent,
		version: content.version + 1,
		history: [...content.history, content],
	};
};