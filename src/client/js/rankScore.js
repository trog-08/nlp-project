// rank sentiment based on score
const rankScore = (score) => {
    switch(score) {
      case 'P+':
        return 'STRONG POSITIVE'
        break;
      case 'P':
        return 'POSITIVE'
        break;
      case 'NEU':
        return 'NEUTRAL'
        break;
      case 'N':
        return 'NEGATIVE'
        break;
      case 'N+':
        return 'STRONG NEGATIVE'
        break;
      case 'NONE':
        return 'WITHOUT SENTIMENT'
        break;
      default:
        return 'UNABLE TO RANK'
        break;
    }
}

export { rankScore }