import { members } from './members'

// Helper: build "who is in the photo" question for a member, with 3 wrong options from others
function photoQuestion(member, wrongNames) {
  const answers = [member.name, ...wrongNames].sort(() => Math.random() - 0.5)
  return {
    question: '¿Quién es el de la foto?',
    image: member.image,
    answers,
    correctAnswer: member.name
  }
}

export const triviaQuestions = [
  // --- Photo questions (who is in the photo) ---
  photoQuestion(members[0], ['Jin', 'Suga', 'J-Hope']),   // RM
  photoQuestion(members[1], ['RM', 'Jimin', 'V']),        // Jin
  photoQuestion(members[2], ['J-Hope', 'Jungkook', 'Jin']), // Suga
  photoQuestion(members[3], ['Jimin', 'V', 'RM']),        // J-Hope
  photoQuestion(members[4], ['Jungkook', 'Suga', 'Jin']), // Jimin
  photoQuestion(members[5], ['RM', 'J-Hope', 'Jimin']),  // V
  photoQuestion(members[6], ['V', 'Jin', 'Suga']),       // Jungkook
  photoQuestion(members[7], ['Lee Know', 'Changbin', 'Han']),   // Bang Chan
  photoQuestion(members[8], ['Hyunjin', 'Felix', 'I.N']),     // Lee Know
  photoQuestion(members[9], ['Bang Chan', 'Seungmin', 'Felix']), // Changbin
  photoQuestion(members[10], ['Han', 'Lee Know', 'Changbin']),  // Hyunjin
  photoQuestion(members[11], ['Felix', 'I.N', 'Seungmin']),    // Han
  photoQuestion(members[12], ['I.N', 'Bang Chan', 'Hyunjin']), // Felix
  photoQuestion(members[13], ['Seungmin', 'Han', 'Lee Know']), // Seungmin
  photoQuestion(members[14], ['I.N', 'Felix', 'Changbin']),    // I.N
  // --- Regular questions ---
  {
    question: '¿En qué año debutó BTS?',
    answers: ['2010', '2013', '2015', '2017'],
    correctAnswer: '2013'
  },
  {
    question: '¿Cuál es el nombre real del líder de BTS (RM)?',
    answers: ['Kim Namjoon', 'Kim Seokjin', 'Min Yoongi', 'Jung Hoseok'],
    correctAnswer: 'Kim Namjoon'
  },
  {
    question: '¿Cuántos integrantes tiene Stray Kids?',
    answers: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    question: '¿Cuál es el nombre del fandom oficial de BTS?',
    answers: ['ARMY', 'STAY', 'BLINK', 'ONCE'],
    correctAnswer: 'ARMY'
  },
  {
    question: '¿Cuál es el nombre del fandom oficial de Stray Kids?',
    answers: ['STAY', 'ARMY', 'MIDZY', 'ATINY'],
    correctAnswer: 'STAY'
  },
  {
    question: '¿Qué significa "BTS"?',
    answers: [
      'Bangtan Sonyeondan',
      'Beyond The Scene',
      'Bangtan Boys',
      'Todas las anteriores'
    ],
    correctAnswer: 'Todas las anteriores'
  },
  {
    question: '¿Cuál es el nombre real de Suga de BTS?',
    answers: ['Min Yoongi', 'Kim Namjoon', 'Park Jimin', 'Kim Taehyung'],
    correctAnswer: 'Min Yoongi'
  },
  {
    question: '¿En qué año debutó Stray Kids?',
    answers: ['2016', '2017', '2018', '2019'],
    correctAnswer: '2018'
  },
  {
    question: '¿Cuál es el nombre del líder de Stray Kids?',
    answers: ['Lee Know', 'Bang Chan', 'Changbin', 'Hyunjin'],
    correctAnswer: 'Bang Chan'
  },
  {
    question: '¿Qué canción de BTS fue la primera en alcanzar el #1 en Billboard Hot 100?',
    answers: ['Dynamite', 'Butter', 'Permission to Dance', 'Life Goes On'],
    correctAnswer: 'Dynamite'
  },
  {
    question: '¿Cuál es el nombre real de V de BTS?',
    answers: ['Kim Taehyung', 'Park Jimin', 'Jeon Jungkook', 'Kim Seokjin'],
    correctAnswer: 'Kim Taehyung'
  },
  {
    question: '¿Qué miembro de Stray Kids es conocido por su voz profunda?',
    answers: ['Felix', 'Seungmin', 'I.N', 'Han'],
    correctAnswer: 'Felix'
  },
  {
    question: '¿Cuál es el nombre del maknae (miembro más joven) de BTS?',
    answers: ['Jungkook', 'V', 'Jimin', 'J-Hope'],
    correctAnswer: 'Jungkook'
  },
  {
    question: '¿Qué miembro de Stray Kids es el maknae (más joven)?',
    answers: ['I.N', 'Seungmin', 'Felix', 'Han'],
    correctAnswer: 'I.N'
  },
  {
    question: '¿En qué compañía discográfica está BTS?',
    answers: ['SM Entertainment', 'YG Entertainment', 'Big Hit Music', 'JYP Entertainment'],
    correctAnswer: 'Big Hit Music'
  },
  {
    question: '¿En qué compañía discográfica está Stray Kids?',
    answers: ['SM Entertainment', 'YG Entertainment', 'JYP Entertainment', 'Cube Entertainment'],
    correctAnswer: 'JYP Entertainment'
  },
  {
    question: '¿Cuál es el nombre real de Jimin de BTS?',
    answers: ['Park Jimin', 'Kim Taehyung', 'Jeon Jungkook', 'Kim Seokjin'],
    correctAnswer: 'Park Jimin'
  },
  {
    question: '¿Qué miembro de Stray Kids es conocido como "3RACHA" junto con Bang Chan y Changbin?',
    answers: ['Han', 'Hyunjin', 'Lee Know', 'Felix'],
    correctAnswer: 'Han'
  },
  {
    question: '¿Cuál es el nombre real de Jin de BTS?',
    answers: ['Kim Seokjin', 'Kim Namjoon', 'Min Yoongi', 'Jung Hoseok'],
    correctAnswer: 'Kim Seokjin'
  },
  {
    question: '¿Qué canción de Stray Kids tiene la frase "God\'s Menu"?',
    answers: ['God\'s Menu', 'Back Door', 'Maniac', 'Thunderous'],
    correctAnswer: 'God\'s Menu'
  },
  {
    question: '¿Cuál es el nombre real de J-Hope de BTS?',
    answers: ['Jung Hoseok', 'Kim Namjoon', 'Min Yoongi', 'Park Jimin'],
    correctAnswer: 'Jung Hoseok'
  },
  {
    question: '¿Cuál es el nombre real de Jungkook de BTS?',
    answers: ['Jeon Jungkook', 'Kim Taehyung', 'Kim Seokjin', 'Park Jimin'],
    correctAnswer: 'Jeon Jungkook'
  },
  {
    question: '¿Qué subunidad de BTS forman RM, Suga y J-Hope?',
    answers: ['Vocal Line', 'Dance Line', 'Rap Line', 'Maknae Line'],
    correctAnswer: 'Rap Line'
  },
  {
    question: '¿En qué país nació Felix de Stray Kids?',
    answers: ['Corea del Sur', 'Japón', 'Australia', 'Estados Unidos'],
    correctAnswer: 'Australia'
  },
  {
    question: '¿Qué álbum de BTS tiene la canción "Spring Day"?',
    answers: ['You Never Walk Alone', 'Love Yourself: Her', 'Map of the Soul: 7', 'BE'],
    correctAnswer: 'You Never Walk Alone'
  },
  {
    question: '¿Cuántos integrantes tiene BTS?',
    answers: ['5', '6', '7', '9'],
    correctAnswer: '7'
  },
  {
    question: '¿Qué miembro de Stray Kids es de Australia además de Felix?',
    answers: ['Bang Chan', 'Lee Know', 'Changbin', 'Ninguno, solo Felix'],
    correctAnswer: 'Bang Chan'
  },
  {
    question: '¿Cuál fue el primer grupo que tuvo BTS antes del nombre actual?',
    answers: ['Bangtan Sonyeondan', 'Bulletproof Boy Scouts', 'Ambos son correctos', 'Ninguno'],
    correctAnswer: 'Ambos son correctos'
  },
  {
    question: '¿Qué miembro de Stray Kids tiene el nombre artístico "I.N"?',
    answers: ['Yang Jeongin', 'Kim Seungmin', 'Lee Felix', 'Han Jisung'],
    correctAnswer: 'Yang Jeongin'
  },
  {
    question: '¿Qué canción de BTS tiene la frase "I\'m the one I should love"?',
    answers: ['Epiphany', 'Answer: Love Myself', 'Magic Shop', 'Mikrokosmos'],
    correctAnswer: 'Epiphany'
  },
  {
    question: '¿Qué miembro de Stray Kids es el líder del grupo?',
    answers: ['Lee Know', 'Bang Chan', 'Changbin', 'Han'],
    correctAnswer: 'Bang Chan'
  },
  {
    question: '¿En qué año BTS ganó el premio daesang en MAMA?',
    answers: ['2016', '2017', '2018', '2019'],
    correctAnswer: '2016'
  },
  {
    question: '¿Qué miembro de BTS lanzó la mixtape "Agust D"?',
    answers: ['RM', 'Suga', 'J-Hope', 'Jungkook'],
    correctAnswer: 'Suga'
  },
  {
    question: '¿Cuál es el nombre del reality de pre-debut de Stray Kids?',
    answers: ['Stray Kids', 'Win', 'No Mercy', 'Sixteen'],
    correctAnswer: 'Stray Kids'
  }
]
