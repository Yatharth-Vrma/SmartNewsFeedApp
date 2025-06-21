import { View, StyleSheet } from 'react-native';

const SkeletonLoader = () => {
  return (
    <View>
      {[...Array(4)].map((_, i) => (
        <View style={styles.container} key={i}>
          <View style={[styles.skeleton, styles.imageSkeleton]} />
          <View style={styles.textContainer}>
            <View style={[styles.skeleton, styles.titleSkeleton]} />
            <View style={[styles.skeleton, styles.textSkeleton]} />
            <View style={[styles.skeleton, styles.textSkeleton]} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  skeleton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
  },
  imageSkeleton: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    padding: 12,
  },
  titleSkeleton: {
    width: '70%',
    height: 20,
  },
  textSkeleton: {
    width: '100%',
    height: 14,
  },
});

export default SkeletonLoader;