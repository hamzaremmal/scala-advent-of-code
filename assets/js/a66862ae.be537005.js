"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7589],{4909:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var i=n(7462),a=(n(7294),n(3905));n(6340);const o={},r="Day 10: Pipe Maze",l={unversionedId:"2023/puzzles/day10",id:"2023/puzzles/day10",title:"Day 10: Pipe Maze",description:"by @EugeneFlesselle",source:"@site/target/mdoc/2023/puzzles/day10.md",sourceDirName:"2023/puzzles",slug:"/2023/puzzles/day10",permalink:"/scala-advent-of-code/2023/puzzles/day10",draft:!1,editUrl:"https://github.com/scalacenter/scala-advent-of-code/edit/website/docs/2023/puzzles/day10.md",tags:[],version:"current",frontMatter:{},sidebar:"adventOfCodeSidebar",previous:{title:"Day 9: Mirage Maintenance",permalink:"/scala-advent-of-code/2023/puzzles/day09"},next:{title:"Day 11: Cosmic Expansion",permalink:"/scala-advent-of-code/2023/puzzles/day11"}},s={},c=[{value:"Puzzle description",id:"puzzle-description",level:2},{value:"Solution Summary",id:"solution-summary",level:2},{value:"Part 1",id:"part-1",level:3},{value:"Part 2",id:"part-2",level:3},{value:"Final Code",id:"final-code",level:2},{value:"Solutions from the community",id:"solutions-from-the-community",level:2}],p={toc:c};function d(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,i.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"day-10-pipe-maze"},"Day 10: Pipe Maze"),(0,a.kt)("p",null,"by ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/EugeneFlesselle"},"@EugeneFlesselle")),(0,a.kt)("h2",{id:"puzzle-description"},"Puzzle description"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://adventofcode.com/2023/day/10"},"https://adventofcode.com/2023/day/10")),(0,a.kt)("h2",{id:"solution-summary"},"Solution Summary"),(0,a.kt)("p",null,"We can keep the grid as provided in the input, a 2-dimensional array of characters for all intents and purposes.\nWe will also keep track of tiles throughout the problem as identified by their indexes in the grid."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",3:!0,className:"language-scala",metastring:"3"},"def parse(input: String) = input.linesIterator.toSeq\nval grid: Seq[String] = parse(input)\n")),(0,a.kt)("h3",{id:"part-1"},"Part 1"),(0,a.kt)("p",null,"We first implement ",(0,a.kt)("inlineCode",{parentName:"p"},"connected"),", a function returning the tiles connected to a given point ",(0,a.kt)("inlineCode",{parentName:"p"},"p"),",\nas specified in the problem description, and in no particular order.\nFor the starting position ",(0,a.kt)("inlineCode",{parentName:"p"},"'S'")," in particular, as we do not know its direction,\nwe can try all the four tiles surrounding it and keep those connecting back to it."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",3:!0,className:"language-scala",metastring:"3"},"def connected(grid: Seq[String])(p: (Int, Int)): Set[(Int, Int)] =\n  val (i, j) = p\n  grid(i)(j) match\n    case '|' => Set((i - 1, j), (i + 1, j))\n    case '-' => Set((i, j - 1), (i, j + 1))\n    case 'L' => Set((i - 1, j), (i, j + 1))\n    case 'J' => Set((i - 1, j), (i, j - 1))\n    case '7' => Set((i + 1, j), (i, j - 1))\n    case 'F' => Set((i + 1, j), (i, j + 1))\n    case '.' => Set()\n    case 'S' => Set((i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1))\n      .filter((i,j) => grid.isDefinedAt(i) && grid(i).isDefinedAt(j))\n      .filter(connected(grid)(_).contains(i, j))\n")),(0,a.kt)("p",null,"In order to identify the loop, we begin by finding the starting position ",(0,a.kt)("inlineCode",{parentName:"p"},"start"),"\nand choosing one of the possible next tiles arbitrarily ",(0,a.kt)("inlineCode",{parentName:"p"},"connected(start).head"),".\nWe can then iterate to the next connected tile until we reach the starting position again."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",3:!0,className:"language-scala",metastring:"3"},"def findLoop(grid: Seq[String]): Seq[(Int, Int)] =\n  val start =\n    val startI = grid.indexWhere(_.contains('S'))\n    (startI, grid(startI).indexOf('S'))\n\n  val initial = (start, connected(grid)(start).head)\n  val loop = LazyList.iterate(initial): (prev, curr) =>\n    val next = connected(grid)(curr) - prev\n    (curr, next.head)\n\n  start +: loop.map(_._2).takeWhile(_ != start)\n")),(0,a.kt)("p",null,"Once we have found the loop,\nthe distance from the starting position to the furthest point along the loop\nis simply half of its length."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",3:!0,className:"language-scala",metastring:"3"},"def part1(input: String): Int = findLoop(parse(input)).length / 2\n")),(0,a.kt)("h3",{id:"part-2"},"Part 2"),(0,a.kt)("p",null,"First consider the problem of counting the number of tiles enclosed by the loop on a given line.\nWe will iterate over the line, keeping track of whether we are not we are inside the loop, which changes each time we cross over the path.\nWe start from the beginning of the line as outside the loop,\nbecome enclosed when we cross it for the first time, until we cross the loop again, and so on."),(0,a.kt)("p",null,"Observe that this not only happens when going over ",(0,a.kt)("inlineCode",{parentName:"p"},"|")," pipes, but also in situations like ",(0,a.kt)("inlineCode",{parentName:"p"},"..L--7.."),",\nwhich could be viewed as an elongated ",(0,a.kt)("inlineCode",{parentName:"p"},"|")," from the perspective of our current line.\nSo we can count as crossings, either all pipes connecting to the north ('|', 'L', 'J'`)\nor all pipes connecting to south ('|', '7', 'F'), as long as we count a single crossing in either case."),(0,a.kt)("p",null,"We pick the former in the solution below,\n",(0,a.kt)("inlineCode",{parentName:"p"},"connectsNorth")," determines if a pipe connects to the north by checking if the tile above it is in its set of connected pipes.\nOf course, doing a disjunction of cases as detailed above would also work, but would require treating the starting point ",(0,a.kt)("inlineCode",{parentName:"p"},"S")," separately once again."),(0,a.kt)("p",null,"We make sure to only consider the pipes actually in the loop as potential crossings\nand only increase the count in enclosed portions for tiles which are not part of the loop.\nFinally, we obtain the total number of enclosed tiles by iterating over all lines."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",3:!0,className:"language-scala",metastring:"3"},"def part2(input: String): Int =\n  val grid = parse(input)\n  val inLoop = findLoop(grid).toSet\n\n  def connectsNorth(i: Int, j: Int): Boolean =\n    connected(grid)(i,j).contains(i-1, j)\n\n  def enclosedInLine(i: Int): Int =\n    val (_, count) = grid(i).indices.foldLeft((false, 0)):\n      case ((enclosed, count), j) if inLoop(i, j) =>\n        (enclosed ^ connectsNorth(i, j), count)\n      case ((true, count), j) =>\n        (true, count + 1)\n      case ((false, count), j) =>\n        (false, count)\n    count\n\n  grid.indices.map(enclosedInLine).sum\n")),(0,a.kt)("h2",{id:"final-code"},"Final Code"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",3:!0,className:"language-scala",metastring:"3"},"def parse(input: String) = input.linesIterator.toSeq\n\n/** The tiles connected to point `p` in the `grid`  */\ndef connected(grid: Seq[String])(p: (Int, Int)): Set[(Int, Int)] =\n  val (i, j) = p\n  grid(i)(j) match\n    case '|' => Set((i - 1, j), (i + 1, j))\n    case '-' => Set((i, j - 1), (i, j + 1))\n    case 'L' => Set((i - 1, j), (i, j + 1))\n    case 'J' => Set((i - 1, j), (i, j - 1))\n    case '7' => Set((i + 1, j), (i, j - 1))\n    case 'F' => Set((i + 1, j), (i, j + 1))\n    case '.' => Set()\n    case 'S' => Set((i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1))\n      .filter((i, j) => grid.isDefinedAt(i) && grid(i).isDefinedAt(j))\n      .filter(connected(grid)(_).contains(i, j))\nend connected\n\n/** The loop starting from 'S' in the grid */\ndef findLoop(grid: Seq[String]): Seq[(Int, Int)] =\n  val start =\n    val startI = grid.indexWhere(_.contains('S'))\n    (startI, grid(startI).indexOf('S'))\n\n  val initial = (start, connected(grid)(start).head)\n\n  /** List of connected points starting from 'S'\n   * e.g. `(y0, x0) :: (y1, x1) :: (y2, x2) :: ...`\n   */\n  val loop = LazyList.iterate(initial): (prev, curr) =>\n    val next = connected(grid)(curr) - prev\n    (curr, next.head)\n\n  start +: loop.map(_._2).takeWhile(_ != start)\nend findLoop\n\ndef part1(input: String): String =\n  val grid = parse(input)\n  val loop = findLoop(grid)\n  (loop.length / 2).toString\nend part1\n\ndef part2(input: String): String =\n  val grid = parse(input)\n  val inLoop = findLoop(grid).toSet\n\n  /** True iff `grid(i)(j)` is a pipe connecting to the north */\n  def connectsNorth(i: Int, j: Int): Boolean =\n    connected(grid)(i, j).contains(i - 1, j)\n\n  /** Number of tiles enclosed by the loop in `grid(i)` */\n  def enclosedInLine(i: Int): Int =\n    val (_, count) = grid(i).indices.foldLeft((false, 0)):\n      case ((enclosed, count), j) if inLoop(i, j) =>\n        (enclosed ^ connectsNorth(i, j), count)\n      case ((true, count), j) =>\n        (true, count + 1)\n      case ((false, count), j) =>\n        (false, count)\n    count\n\n  grid.indices.map(enclosedInLine).sum.toString\nend part2\n")),(0,a.kt)("h2",{id:"solutions-from-the-community"},"Solutions from the community"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/xRuiAlves/advent-of-code-2023/blob/main/Day10.scala"},"Solution")," by ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/xRuiAlves/"},"Rui Alves")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/lenguyenthanh/aoc-2023/blob/main/Day10.scala"},"Solution")," by ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/lenguyenthanh"},"Thanh Le")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/SethTisue/adventofcode/blob/main/2023/src/test/scala/Day10.scala"},"Solution")," by ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/SethTisue"},"Seth Tisue")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/rayrobdod/advent-of-code/blob/main/2023/10/day10.scala"},"Solution")," by ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/rayrobdod/"},"Raymond Dodge")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/marconilanna/advent-of-code/blob/master/2023/Day10.scala"},"Solution")," by ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/marconilanna"},"Marconi Lanna")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/mpilquist/aoc/blob/main/2023/day10.sc"},"Solution")," by ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/mpilquist"},"Michael Pilquist")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/jnclt/adventofcode2023/blob/main/day10/pipe-maze.sc"},"Solution")," by ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/jnclt"},"jnclt"))),(0,a.kt)("p",null,"Share your solution to the Scala community by editing this page.\nYou can even write the whole article! ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/scalacenter/scala-advent-of-code/discussions/424"},"See here for the expected format")))}d.isMDXComponent=!0}}]);