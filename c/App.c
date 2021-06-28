#include <stdio.h> // standard io header
#include <stdlib.h>

int addNumber(int num1, int num2)
{
	return num1 + num2;
}

struct Student
{
	int age;
	double gpa;
	char grade;
};

int main()
{

	// Hello world
	printf("Hello\n");
	printf("World");

	// Variables
	/*
	Name are case-sensitive and may begin with:
		letters, _
	After, may include
		letters, numbers, _
	Convention says
		camelCase
	*/
	char testGrade = 'A'; // single 8-bit character.
	char name[] = "Mike"; // array of characters (string)

	short age0 = 10;     // at least 16-bits signed integer
	int age1 = 20;	     // at least 16-bits signed integer(not smaller than short)
	long age2 = 30;	     // at least 32-bits signed integer
	long long age3 = 40; // at least 64-bits signed integer

	float gpa0 = 2.5;	// single precision floating point
	double gpa1 = 3.5;	// double-precision floating point
	long double gpa2 = 3.5; // extended-precision floating point

	int isTall; // 0 if false, non-zero if true
	isTall = 1;

	testGrade = 'F';

	const int IS_TALL; // constant

	printf("%s, your grade is %c \n", name, testGrade);

	/*
		%c character
		%d integer number(base 10)
		%e exponential floating-point number
		%f floating-point number
		%i integer (base 10)
		%o octal number (base 8)
		%s a string of characters
		%u unsigned decimal (integer) number
		%x number in hexadecimal (base 16)
		%% print a percent sign
		\% print a percent sign
	*/

	printf("%d \n", (int)3.14);
	printf("%f \n", (double)3 / 2);

	// POINTS

	int num = 10;
	printf("%p \n", &num); // print out the memory address the pointer // 0x7ffeeab29e84

	int *pNum = &num;	// store pointer in variable, lower case p be front of variable name
	printf("%p \n", pNum);	// 0x7ffeeab29e84
	printf("%d \n", *pNum); // 10

	// NUMBERS

	printf("%d \n", 2 * 3);	      // Basic Arithmetic: +, -, /, *
	printf("%d \n", 10 % 3);      // return remainder if 10/3
	printf("%d \n", (1 + 2) * 3); // order of operations
	printf("%f \n", 10 / 3.0);    // int and doubles

	int num1 = 10;
	num1 += 100;

	printf("%d \n", num1);

	num1++;
	printf("%d \n", num1);

	// USER INPUT

	// get string

	// char name1[10];
	// printf("Enter your name1: ");
	// fgets(name1, 10, stdin);
	// printf("Hello %s! \n", name1);

	// get number

	// int age4;
	// printf("Enter your age: ");
	// scanf("%d", &age4);
	// printf("You are %d \n", age4);

	// ARRAY

	// int luckyNumber[6];
	int luckyNumber[] = {1, 2, 3, 4, 7, 88};

	luckyNumber[0] = 88;

	printf("%d \n", luckyNumber[0]);
	printf("%d \n", luckyNumber[1]);

	int numberGrid[2][3] = {{1, 2, 3}, {4, 5, 6}};
	numberGrid[0][1] = 88;

	printf("%d \n", numberGrid[0][0]);
	printf("%d \n", numberGrid[0][1]);

	// FUNCTIONS
	int sum = addNumber(3, 99);
	printf("%d \n", sum);

	// IF STATEMENT

	int isStudent = 0;
	int isSmart = 0;

	if (isStudent != 0 && isSmart != 0)
	{
		printf("you are student \n");
	}
	else if (isStudent != 0 && isSmart == 0)
	{
		printf("Your are not a  smart student\n");
	}
	else
	{
		printf("You are not a student and not smart");
	}

	// SWITCH STATEMENT

	char myGrade = 'A';

	switch (myGrade)
	{
	case 'A':
		printf("you pass\n");
		break;
	case 'F':
		printf("you fail\n");
		break;
	default:
		printf("Invalid grade \n");
	}

	// WHILE LOOPS
	int index1 = 1;
	while (index1 <= 5)
	{
		printf("%d \n", index1);
		index1++;
	}

	// do while loop
	do
	{
		printf("%d \n", index1);
		index1++;
	} while (index1 <= 10);

	// FOR LOOPS
	for (int i = 0; i < 5; i++)
	{
		printf("%d \n", i);
	}

	// STRUCTS
	struct Student student1;
	student1.age = 19;
	student1.gpa = 3.4;
	student1.grade = 'B';

	printf("%c \n", student1.grade);
	return 0;
}