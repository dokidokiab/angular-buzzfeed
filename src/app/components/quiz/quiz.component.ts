import { Component, OnInit } from '@angular/core';
import quiz_questions from '../../../assets/data/quiz_questions.json';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  title:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  constructor() { }

  ngOnInit(): void {
    if (quiz_questions) {
      this.finished = false
      this.title = quiz_questions.title

      this.questions = quiz_questions.questions
      this.questionSelected = this.questions[this.questionMaxIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }

  buttonPressed(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex+=1
    if (this.questionIndex < this.questionMaxIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    }
    else{
      const finalAnswer:string = await this.calculateResults(this.answers)
      this.finished = true

      //força o finalAnswer a se comportar como uma chave do mesmo tipo do que os presentes no array
      this.answerSelected = quiz_questions.results[finalAnswer as keyof typeof quiz_questions.results]
    }
  }

  async calculateResults(answers:string[]){
    const result = answers.reduce((previous, current, i, arr) => {
        if(
          arr.filter(item => (item === previous)).length >
          arr.filter(item => (item === current)).length
        ){
          return previous
        }
        else{
          return  current
        }
      }
    )
    return result
  }
}
