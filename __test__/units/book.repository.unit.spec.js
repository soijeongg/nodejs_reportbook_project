import { jest } from "@jest/globals";
import { bookRepository } from "../../src/Repository/bookRepository";

// Prisma 클라이언트에서는 아래 5개의 메서드만 사용합니다.
let mockPrisma = {
  books: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

let BookRepository = new bookRepository(mockPrisma);

describe('bookRepository Unit Test', () => {

  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  })

  test('allbook Method', async () => {
    // TODO:
    const mockReturn = 'findMany String';
    mockPrisma.books.findMany.mockReturnValue(mockReturn);
    const books = await BookRepository.allbook();
    expect(BookRepository.prisma.books.findMany).toHaveBeenCalledTimes(1);
    expect(books).toBe(mockReturn);
  });


  test('createPost Method', async () => {
    // TODO: 여기에 코드를 작성해야합니다.
     const mockReturn = 'create Return String';
     mockPrisma.books.create.mockReturnValue(mockReturn);
     const books = await BookRepository.createbook();
     expect(BookRepository.prisma.books.create).toHaveBeenCalledTimes(1);
     expect(books).toBe(mockReturn);
  });

});
